import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth/auth";
import { AUTH, ATTRIBUTES } from "@/data/admin/dashboard";
import send from "@/utils/email";
import data from "@/data/config";
import { ensureAppTables, pool } from "@/utils/db";

const types = new Set([
  "admins",
  "committees",
  "judges",
  "mentors",
  "volunteers",
  "participants",
  "interests",
  "sponsors",
  "panels",
  "leads",
]);

const updateStatistic = async (statKey, type, status, value, delta) => {
  if (!value) return;
  const statusKey = String(status);
  const { rows } = await pool.query(
    "SELECT data FROM statistics WHERE key = $1",
    [statKey],
  );
  const data = rows[0]?.data || {};
  if (!data[type]) {
    data[type] = { "-1": {}, 0: {}, 1: {} };
  }
  if (!data[type][statusKey]) {
    data[type][statusKey] = {};
  }
  const current = data[type][statusKey][value] || 0;
  data[type][statusKey][value] = current + delta;
  await pool.query(
    `INSERT INTO statistics (key, data)
     VALUES ($1, $2::jsonb)
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data`,
    [statKey, JSON.stringify(data)],
  );
};

export const POST = async (req, { params }) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.POST);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const body = await req.json();
  try {
    if (types.has(params.type)) {
      await ensureAppTables();
      const element = {};
      ATTRIBUTES[params.type].forEach((attribute) => {
        element[attribute] = body[attribute];
      });

      const fields = Object.keys(element);
      const values = Object.values(element);
      const assignments = fields.map(
        (field, index) => `"${field}" = $${index + 1}`,
      );
      const timestampIndex = values.length + 1;
      const userIdIndex = values.length + 2;

      await pool.query(
        `UPDATE "user"
         SET ${assignments.join(", ")},
             "timestamp" = $${timestampIndex}
         WHERE id = $${userIdIndex}`,
        [...values, new Date(), user.id],
      );

      await pool.query(
        `UPDATE "user"
         SET "roles" = jsonb_set(
           COALESCE("roles", '{}'::jsonb),
           $1::text[],
           to_jsonb($2::int),
           true
         )
         WHERE id = $3`,
        [`{${params.type}}`, 0, user.id],
      );

      if (params.type === "participants" && body["resume"]) {
        await pool.query(
          `INSERT INTO resumes
           (id, first_name, last_name, email, school, grade, resume, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 0)
           ON CONFLICT (id)
           DO UPDATE SET
             first_name = EXCLUDED.first_name,
             last_name = EXCLUDED.last_name,
             email = EXCLUDED.email,
             school = EXCLUDED.school,
             grade = EXCLUDED.grade,
             resume = EXCLUDED.resume,
             status = EXCLUDED.status`,
          [
            user.id,
            body["firstName"],
            body["lastName"],
            body["email"],
            body["school"],
            body["grade"],
            body["resume"],
          ],
        );
      }

      await updateStatistic("shirt", params.type, 0, element.shirt, 1);
      await updateStatistic("diet", params.type, 0, element.diet, 1);
      await updateStatistic("gender", params.type, 0, element.gender, 1);
      await updateStatistic("age", params.type, 0, element.age, 1);

      send({
        email: user.email,
        id: "confirmation",
        name: user.firstName,
        position: params.type.slice(0, -1),
        subject: `[${data.name}] Thank you for applying!`,
        preview: `Thank you for applying to ${data.name}`,
      });
    }

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const GET = async (req, { params }) => {
  const size = req.nextUrl.searchParams.get("size");
  const last = req.nextUrl.searchParams.get("last");

  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const output = [];

  try {
    if (types.has(params.type)) {
      await ensureAppTables();
      const sizeValue = parseInt(size || "0", 10) || 50;
      const attributes = ATTRIBUTES[params.type];
      const selectFields = attributes.map((field) => `"${field}"`).join(", ");
      let rows = [];

      if (last !== "undefined") {
        const lastResult = await pool.query(
          `SELECT COALESCE(("roles"->>$1)::int, 999) AS status
           FROM "user"
           WHERE id = $2`,
          [params.type, last],
        );
        const lastStatus = lastResult.rows[0]?.status ?? 999;
        const result = await pool.query(
          `SELECT id, "timestamp", "roles", ${selectFields}
           FROM "user"
           WHERE COALESCE(("roles"->>$1)::int, 999) IN (-1, 0, 1)
             AND (COALESCE(("roles"->>$1)::int, 999), id) > ($2, $3)
           ORDER BY COALESCE(("roles"->>$1)::int, 999), id
           LIMIT $4`,
          [params.type, lastStatus, last, sizeValue],
        );
        rows = result.rows;
      } else {
        const result = await pool.query(
          `SELECT id, "timestamp", "roles", ${selectFields}
           FROM "user"
           WHERE COALESCE(("roles"->>$1)::int, 999) IN (-1, 0, 1)
           ORDER BY COALESCE(("roles"->>$1)::int, 999), id
           LIMIT $2`,
          [params.type, sizeValue],
        );
        rows = result.rows;
      }

      rows.forEach((row) => {
        const element = {};
        ATTRIBUTES[params.type].forEach((attribute) => {
          element[attribute] = row[attribute];
        });
        output.push({
          ...element,
          uid: row.id,
          timestamp: row.timestamp,
          status: row.roles?.[params.type],
          selected: false,
          hidden: false,
        });
      });

      const countResult = await pool.query(
        `SELECT COUNT(*)::int AS count
         FROM "user"
         WHERE COALESCE(("roles"->>$1)::int, 999) IN (-1, 0, 1)`,
        [params.type],
      );

      const total = countResult.rows[0]?.count || 0;
      const lastDoc = output.length > 0 ? output[output.length - 1].uid : "";

      return res.json(
        {
          message: "OK",
          items: output,
          total: total,
          last: lastDoc,
        },
        { status: 200 },
      );
    }
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const PUT = async (req, { params }) => {
  const res = NextResponse;
  const { objects, status } = await req.json();
  const { auth, message } = await authenticate(AUTH.PUT);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      await ensureAppTables();
      objects.map(async (object) => {
        await pool.query(
          `UPDATE "user"
           SET "roles" = jsonb_set(
             COALESCE("roles", '{}'::jsonb),
             $1::text[],
             to_jsonb($2::int),
             true
           )
           WHERE id = $3`,
          [`{${params.type}}`, status, object.uid],
        );

        const id = status === 1 ? "acceptance" : "rejection";

        const preview =
          id === "acceptance"
            ? "You have been accepted!"
            : "Thank you for applying!";

        const subject =
          id === "acceptance"
            ? "🎉 Congratulations 🎉"
            : "Application Status Update";

        await send({
          email: object.email,
          id: id,
          name: object.firstName,
          position: params.type.slice(0, -1),
          subject: `[${data.name}] ${subject}`,
          preview: preview,
        });

        try {
          await updateStatistic("shirt", params.type, status, object.shirt, 1);
          await updateStatistic("shirt", params.type, 0, object.shirt, -1);

          await updateStatistic("diet", params.type, status, object.diet, 1);
          await updateStatistic("diet", params.type, 0, object.diet, -1);

          await updateStatistic(
            "gender",
            params.type,
            status,
            object.gender,
            1,
          );
          await updateStatistic("gender", params.type, 0, object.gender, -1);

          await updateStatistic("age", params.type, status, object.age, 1);
          await updateStatistic("age", params.type, 0, object.age, -1);
        } catch (error) {
          console.error(error);
        }
      });
    }
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const DELETE = async (req, { params }) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.DELETE);
  const objects = await req.json();

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      await ensureAppTables();
      await Promise.all(
        objects.map(async ({ uid, shirt, diet, gender, age }) => {
          const snapshot = await pool.query(
            `SELECT "roles" FROM "user" WHERE id = $1`,
            [uid],
          );
          const status = snapshot.rows[0]?.roles?.[params.type];
          await pool.query(
            `UPDATE "user"
             SET "roles" = COALESCE("roles", '{}'::jsonb) - $1
             WHERE id = $2`,
            [params.type, uid],
          );
          if (params.type === "participants") {
            await pool.query("DELETE FROM resumes WHERE id = $1", [uid]);
          }
          await updateStatistic("shirt", params.type, status, shirt, -1);
          await updateStatistic("diet", params.type, status, diet, -1);
          await updateStatistic("gender", params.type, status, gender, -1);
          await updateStatistic("age", params.type, status, age, -1);
        }),
      );
    }
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";
import { ensureAppTables, pool } from "@/utils/db";

export const GET = async () => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const teams = [];
  const judges = [];

  try {
    await ensureAppTables();
    const [teamsResult, judgesResult] = await Promise.all([
      pool.query(
        "SELECT id, links, name, rounds, table_label FROM teams WHERE status IN (0, 1)",
      ),
      pool.query(
        `SELECT id, "affiliation", "firstName", "lastName"
         FROM "user"
         WHERE COALESCE((roles->>'judges')::int, -2) = 1`,
      ),
    ]);

    teamsResult.rows.forEach((row) => {
      const { links, name, rounds, table_label: tableLabel } = row;
      const safeLinks = links || {};

      if ((safeLinks.devpost || "") !== "") {
        const formattedRounds = rounds || [];
        const formattedTable = tableLabel || "";
        const formattedLinks = Object.entries(safeLinks).map(([key, value]) => {
          return { name: key, link: value };
        });

        teams.push({
          links: formattedLinks,
          rounds: formattedRounds,
          table: formattedTable,
          name,
          uid: row.id,
          hidden: false,
        });
      }
    });

    judgesResult.rows.forEach((row) => {
      const { affiliation, firstName, lastName } = row;

      const name = firstName + " " + lastName;
      judges.push({
        affiliation,
        name,
        uid: row.id,
      });
    });

    return res.json(
      { message: "OK", items: { teams, judges } },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const DELETE = async (req) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.DELETE);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const ids = req.nextUrl.searchParams.get("ids").split(",");

  try {
    await ensureAppTables();
    await Promise.all(
      ids.map(async (id) => {
        await pool.query(
          "UPDATE teams SET table_label = NULL, rounds = NULL WHERE id = $1",
          [id],
        );
      }),
    );

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const PUT = async (req) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.PUT);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { teams, judges } = await req.json();

  try {
    await ensureAppTables();
    await Promise.all(
      teams.map(async (object) => {
        await pool.query(
          "UPDATE teams SET table_label = $1, rounds = $2::jsonb WHERE id = $3",
          [object.table, JSON.stringify(object.rounds), object.uid],
        );
      }),
    );

    await Promise.all(
      judges.map(async (object) => {
        await pool.query(
          `UPDATE "user" SET "rounds" = $1::jsonb WHERE id = $2`,
          [JSON.stringify(object.rounds), object.uid],
        );
      }),
    );

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

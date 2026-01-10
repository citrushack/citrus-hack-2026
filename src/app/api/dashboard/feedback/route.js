import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";
import { ensureAppTables, pool } from "@/utils/db";
import { randomUUID } from "crypto";

export const POST = async (req) => {
  const res = NextResponse;
  const { auth } = await authenticate(AUTH.POST);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const {
    rating,
    additionalComments,
    eventSource,
    improvements,
    notBeneficial,
    helpful,
  } = await req.json();

  try {
    await ensureAppTables();
    await pool.query(
      `INSERT INTO feedback
       (id, rating, additional_comments, event_source, improvements, not_beneficial, helpful, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 0)`,
      [
        randomUUID(),
        parseInt(rating, 10),
        additionalComments,
        eventSource,
        improvements,
        notBeneficial,
        helpful,
      ],
    );
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

export const GET = async (req) => {
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
    await ensureAppTables();
    const sizeValue = parseInt(size || "0", 10) || 50;
    let rows = [];

    if (last !== "undefined") {
      const lastResult = await pool.query(
        "SELECT status FROM feedback WHERE id = $1",
        [last],
      );
      const lastStatus = lastResult.rows[0]?.status;
      const result = await pool.query(
        `SELECT id, rating, additional_comments, event_source, improvements, not_beneficial, helpful, status
         FROM feedback
         WHERE status IN (-1, 0, 1)
           AND (status, id) > ($1, $2)
         ORDER BY status, id
         LIMIT $3`,
        [lastStatus, last, sizeValue],
      );
      rows = result.rows;
    } else {
      const result = await pool.query(
        `SELECT id, rating, additional_comments, event_source, improvements, not_beneficial, helpful, status
         FROM feedback
         WHERE status IN (-1, 0, 1)
         ORDER BY status, id
         LIMIT $1`,
        [sizeValue],
      );
      rows = result.rows;
    }

    rows.forEach((row) => {
      output.push({
        uid: row.id,
        rating: row.rating,
        additionalComments: row.additional_comments,
        eventSource: row.event_source,
        improvements: row.improvements,
        notBeneficial: row.not_beneficial,
        helpful: row.helpful,
        status: row.status,
      });
    });

    const countResult = await pool.query(
      "SELECT COUNT(*)::int AS count FROM feedback WHERE status IN (-1, 0, 1)",
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

  const { objects, status } = await req.json();

  try {
    await ensureAppTables();
    await Promise.all(
      objects.map(async (object) => {
        await pool.query("UPDATE feedback SET status = $1 WHERE id = $2", [
          status,
          object.uid,
        ]);
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

export const DELETE = async (req) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.DELETE);
  const objects = req.nextUrl.searchParams.get("remove").split(",");

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    await ensureAppTables();
    await Promise.all(
      objects.map(async (object) => {
        await pool.query("DELETE FROM feedback WHERE id = $1", [object]);
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

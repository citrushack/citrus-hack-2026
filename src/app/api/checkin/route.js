import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { ensureAppTables, pool } from "@/utils/db";
export const GET = async (req) => {
  const res = NextResponse;
  const { auth, message } = await authenticate({
    admins: [1],
  });

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const uid = req.nextUrl.searchParams.get("uid");

  try {
    await ensureAppTables();
    const { rows } = await pool.query(
      `SELECT "events" FROM "user" WHERE id = $1`,
      [uid],
    );
    const data = rows[0]?.events || [];
    return res.json({ message: "OK", items: data }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
export const PUT = async (req) => {
  const res = NextResponse;
  const { auth, message } = await authenticate({
    admins: [1],
  });

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { uid, event, name } = await req.json();

  try {
    await ensureAppTables();
    const { rows } = await pool.query(
      `SELECT "events" FROM "user" WHERE id = $1`,
      [uid],
    );
    const existing = rows[0]?.events || [];
    const updatedEvents = existing.includes(event)
      ? existing
      : [...existing, event];

    await pool.query(`UPDATE "user" SET "events" = $1::jsonb WHERE id = $2`, [
      JSON.stringify(updatedEvents),
      uid,
    ]);

    await pool.query(
      `INSERT INTO events (id, name, attendance)
       VALUES ($1, $2, 1)
       ON CONFLICT (id)
       DO UPDATE SET attendance = events.attendance + 1`,
      [event, name],
    );

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

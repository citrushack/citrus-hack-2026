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

  try {
    const output = [];
    await ensureAppTables();
    const { rows } = await pool.query(
      "SELECT name, table_label, rounds, links FROM teams",
    );
    rows.forEach((row) => {
      if (row.rounds) {
        output.push({
          name: row.name,
          table: row.table_label,
          links: row.links,
          rounds: row.rounds,
        });
      }
    });

    return res.json({ message: "OK", items: output }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

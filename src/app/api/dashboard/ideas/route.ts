import { AUTH } from "@/data/admin/dashboard";
import { authenticate } from "@/utils/auth/auth";
import { ensureAppTables, pool } from "@/utils/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

interface idea {
  title: string;
  languages: string[];
  details: string;
  contact: string;
}

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
    await ensureAppTables();
    const output: idea[] = [];
    const { rows } = await pool.query(
      "SELECT title, languages, details, contact FROM ideas ORDER BY created_at DESC",
    );
    rows.forEach((row) => {
      output.push({
        title: row.title,
        languages: row.languages || [],
        details: row.details,
        contact: row.contact,
      });
    });

    return res.json(
      {
        message: "OK",
        items: output,
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

export const POST = async (req: Request) => {
  const { auth, message } = await authenticate(AUTH.POST);

  const res = NextResponse;

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { idea, languages, details, contact } = await req.json();

  try {
    await ensureAppTables();
    await pool.query(
      `INSERT INTO ideas (id, title, languages, details, contact)
       VALUES ($1, $2, $3::jsonb, $4, $5)`,
      [randomUUID(), idea, JSON.stringify(languages), details, contact],
    );
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

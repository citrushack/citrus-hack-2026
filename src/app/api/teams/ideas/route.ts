import { authenticate } from "@/utils/auth/auth";
import { ensureAppTables, pool } from "@/utils/db";
import { randomUUID } from "crypto";

export const POST = async (req: Request) => {
  const { auth, message } = await authenticate({
    participants: [1],
  });

  if (auth !== 200) {
    return Response.json(
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
    return Response.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

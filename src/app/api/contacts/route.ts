import { authenticate } from "@/utils/auth/auth";
import { ensureAppTables, pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

type contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const GET = async (req: NextRequest) => {
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

  const role = req.nextUrl.searchParams.get("role");
  const status = parseInt(req.nextUrl.searchParams.get("status")!);

  const output: contact[] = [];

  try {
    await ensureAppTables();
    const { rows } = await pool.query(
      `SELECT email
       FROM "user"
       WHERE COALESCE((roles->>$1)::int, -2) = $2`,
      [role, status],
    );
    rows.forEach((row) => {
      output.push(row.email);
    });

    return res.json({ items: output.join(",") }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/user/members";
import { ensureAppTables, pool } from "@/utils/db";

export const DELETE = async () => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.DELETE);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  await ensureAppTables();
  const { rows } = await pool.query("SELECT members FROM teams WHERE id = $1", [
    user.team,
  ]);
  const members = rows[0]?.members || [];

  try {
    if (members.length <= 1) {
      await pool.query("DELETE FROM teams WHERE id = $1", [user.team]);
    } else {
      const updatedMembers = members.filter((member) => member.uid !== user.id);
      await pool.query("UPDATE teams SET members = $1::jsonb WHERE id = $2", [
        JSON.stringify(updatedMembers),
        user.team,
      ]);
    }
    await pool.query(`UPDATE "user" SET "team" = $1 WHERE id = $2`, [
      "",
      user.id,
    ]);
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
  const { auth, message, user } = await authenticate(AUTH.PUT);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { team } = await req.json();

  try {
    await ensureAppTables();
    const { rows } = await pool.query(
      "SELECT members FROM teams WHERE id = $1",
      [team],
    );
    if (!rows.length)
      return res.json({ message: "Invalid Team ID" }, { status: 500 });
    const { members } = rows[0];
    if (members.length < 4) {
      const updatedMembers = [
        ...members,
        {
          discord: user.discord,
          name: `${user.firstName} ${user.lastName}`,
          uid: user.id,
        },
      ];
      await pool.query("UPDATE teams SET members = $1::jsonb WHERE id = $2", [
        JSON.stringify(updatedMembers),
        team,
      ]);
      await pool.query(`UPDATE "user" SET "team" = $1 WHERE id = $2`, [
        team,
        user.id,
      ]);
      return res.json({ message: "OK" }, { status: 200 });
    } else
      return res.json({ message: "Exceeded 4 People Limit" }, { status: 500 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

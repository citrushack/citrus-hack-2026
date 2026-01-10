import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/user/team";
import { ensureAppTables, pool } from "@/utils/db";
import { randomUUID } from "crypto";

export const POST = async (req) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.POST);
  const { team } = await req.json();

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    await ensureAppTables();
    const teamId = randomUUID();
    const newTeam = {
      links: {
        github: "",
        devpost: "",
        figma: "",
      },
      name: team.name,
      members: [
        {
          discord: user.discord,
          name: `${user.firstName} ${user.lastName}`,
          uid: user.id,
        },
      ],
      status: 0,
    };
    await pool.query(
      `INSERT INTO teams (id, name, status, links, members)
       VALUES ($1, $2, $3, $4::jsonb, $5::jsonb)`,
      [
        teamId,
        newTeam.name,
        newTeam.status,
        JSON.stringify(newTeam.links),
        JSON.stringify(newTeam.members),
      ],
    );
    await pool.query(`UPDATE "user" SET "team" = $1 WHERE id = $2`, [
      teamId,
      user.id,
    ]);
    return res.json(
      {
        message: "OK",
        id: teamId,
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
  const { auth, user } = await authenticate(AUTH.PUT);
  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${"MESSAGE VARIABLE SHOULD BE HERE"}` },
      { status: auth },
    );
  }

  const {
    links: { github, figma, devpost },
    members,
    name,
  } = await req.json();

  try {
    await ensureAppTables();
    await pool.query(
      `UPDATE teams
       SET name = $1, links = $2::jsonb, members = $3::jsonb
       WHERE id = $4`,
      [
        name,
        JSON.stringify({ github, figma, devpost }),
        JSON.stringify(members),
        user.team,
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
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const team = req.nextUrl.searchParams.get("teamid");

  try {
    await ensureAppTables();
    const { rows } = await pool.query(
      "SELECT links, members, name FROM teams WHERE id = $1",
      [team],
    );
    if (!rows.length)
      return res.json({ message: "Invalid Team ID" }, { status: 500 });
    const { links, members, name } = rows[0];
    return res.json(
      {
        message: "OK",
        items: {
          github: links.github,
          devpost: links.devpost,
          figma: links.figma,
          members: members,
          name: name,
        },
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

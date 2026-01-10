import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";
import { ensureAppTables, pool } from "@/utils/db";

export const GET = async (req) => {
  const direction = req.nextUrl.searchParams.get("direction");
  const index = req.nextUrl.searchParams.get("index");
  const size = req.nextUrl.searchParams.get("size");
  const first = req.nextUrl.searchParams.get("first");
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

    if (direction === "next" && last !== "undefined") {
      const lastResult = await pool.query(
        "SELECT status FROM teams WHERE id = $1",
        [last],
      );
      const lastStatus = lastResult.rows[0]?.status;
      const result = await pool.query(
        `SELECT id, links, status, members, timestamp, name
         FROM teams
         WHERE status IN (-1, 0, 1)
           AND (status, id) > ($1, $2)
         ORDER BY status, id
         LIMIT $3`,
        [lastStatus, last, sizeValue],
      );
      rows = result.rows;
    } else if (direction === "prev" && first !== "undefined") {
      const firstResult = await pool.query(
        "SELECT status FROM teams WHERE id = $1",
        [first],
      );
      const firstStatus = firstResult.rows[0]?.status;
      const result = await pool.query(
        `SELECT id, links, status, members, timestamp, name
         FROM teams
         WHERE status IN (-1, 0, 1)
           AND (status, id) < ($1, $2)
         ORDER BY status DESC, id DESC
         LIMIT $3`,
        [firstStatus, first, sizeValue],
      );
      rows = result.rows.reverse();
    } else {
      const result = await pool.query(
        `SELECT id, links, status, members, timestamp, name
         FROM teams
         WHERE status IN (-1, 0, 1)
         ORDER BY status, id
         LIMIT $1`,
        [sizeValue],
      );
      rows = result.rows;
    }

    rows.forEach((row) => {
      const { links, status, members, timestamp, name } = row;
      const safeMembers = members || [];
      const safeLinks = links || {};

      const formattedNames = safeMembers.map((member) => member.name);
      const formattedDiscords = safeMembers.map((member) => member.discord);
      const formattedUids = safeMembers.map((member) => member.uid);
      const formattedLinks = Object.entries(safeLinks)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => {
          return { name: key, link: value };
        });

      output.push({
        name: name,
        teamid: row.id,
        links: formattedLinks,
        members: formattedNames,
        discords: formattedDiscords,
        uids: formattedUids,
        status,
        uid: row.id,
        selected: false,
        hidden: false,
        timestamp: timestamp || new Date(),
      });
    });

    const countResult = await pool.query(
      "SELECT COUNT(*)::int AS count FROM teams WHERE status IN (-1, 0, 1)",
    );

    const total = countResult.rows[0]?.count || 0;
    const lastDoc = output.length > 0 ? output[output.length - 1].uid : "";
    const firstDoc = output.length > 0 ? output[0].uid : "";

    return res.json(
      {
        message: "OK",
        items: output,
        total: total,
        first: firstDoc,
        last: lastDoc,
        page: parseInt(index) + 1,
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
  const { objects, status } = await req.json();
  const { auth, message } = await authenticate(AUTH.PUT);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    await ensureAppTables();
    objects.map(async (object) => {
      await pool.query("UPDATE teams SET status = $1 WHERE id = $2", [
        status,
        object.uid,
      ]);
    });
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
    objects.map(async (object) => {
      const members = await pool.query(
        `SELECT id FROM "user" WHERE "team" = $1`,
        [object],
      );
      await Promise.all(
        members.rows.map((member) =>
          pool.query(`UPDATE "user" SET "team" = NULL WHERE id = $1`, [
            member.id,
          ]),
        ),
      );
      await pool.query("DELETE FROM teams WHERE id = $1", [object]);
    });
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};

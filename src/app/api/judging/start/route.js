import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/judge/judge";
import { NextResponse } from "next/server";
import { ensureAppTables, pool } from "@/utils/db";

export const GET = async () => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    await ensureAppTables();
    const { rows } = await pool.query(
      `SELECT "rounds" FROM "user" WHERE id = $1`,
      [user.id],
    );
    const formattedRounds = rows[0]?.rounds || [];
    return res.json(
      { message: "OK", items: { rounds: formattedRounds } },
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
  const { auth, message, user } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const body = await req.json();

  try {
    await ensureAppTables();
    const { teamId, round, tracks, implementation, idea, design } = body;
    const roundIndex = parseInt(round) - 1;

    const teamsSnap = await pool.query(
      "SELECT rounds FROM teams WHERE id = $1",
      [teamId],
    );
    const updatedTeamRounds = teamsSnap.rows[0]?.rounds || [];

    updatedTeamRounds[roundIndex] = updatedTeamRounds[roundIndex].map(
      (judge) =>
        judge.uid === user.id
          ? {
              ...judge,
              feedback: {
                tracks,
                implementation,
                idea,
                design,
              },
            }
          : judge,
    );

    await pool.query("UPDATE teams SET rounds = $1::jsonb WHERE id = $2", [
      JSON.stringify(updatedTeamRounds),
      teamId,
    ]);
    const judgesSnap = await pool.query(
      `SELECT "rounds" FROM "user" WHERE id = $1`,
      [user.id],
    );
    const updatedJudgeRounds = judgesSnap.rows[0]?.rounds || [];

    updatedJudgeRounds[roundIndex] = updatedJudgeRounds[roundIndex].map(
      (team) =>
        team.uid === teamId
          ? {
              ...team,
              feedback: {
                tracks,
                implementation,
                idea,
                design,
              },
            }
          : team,
    );

    await pool.query(`UPDATE "user" SET "rounds" = $1::jsonb WHERE id = $2`, [
      JSON.stringify(updatedJudgeRounds),
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

export const POST = async (req) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate(AUTH.POST);
  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const { uid: teamId, round } = await req.json();
  try {
    await ensureAppTables();
    const [judgeSnapshot, teamSnapShot] = await Promise.all([
      pool.query(`SELECT "rounds" FROM "user" WHERE id = $1`, [user.id]),
      pool.query(
        "SELECT id, name, table_label, rounds FROM teams WHERE status = 1",
      ),
    ]);
    const formattedRounds = judgeSnapshot.rows[0]?.rounds || [];
    const teams = teamSnapShot.rows.map((row) => ({
      uid: row.id,
      name: row.name,
      table: row.table_label,
      rounds: row.rounds || [],
    }));

    const filteredTeams = teams.filter((team) => {
      const isNotAssigned = !team.rounds[round].length;
      const haveNotJudged = !team.rounds.some((round) => round.uid === user.id);

      return isNotAssigned && haveNotJudged;
    });

    let selectedTeam;
    let minTeam = Infinity;

    for (const team of filteredTeams) {
      if (team.rounds.length < minTeam) {
        selectedTeam = team;
        minTeam = team.rounds.length;
      }
    }

    formattedRounds[round] = [
      {
        uid: selectedTeam.uid,
        name:
          selectedTeam.table.toString().padStart(2, "0") +
          " : " +
          selectedTeam.name,
      },
    ];
    const selectedSnapshot = await pool.query(
      "SELECT rounds FROM teams WHERE id = $1",
      [selectedTeam.uid],
    );
    const oldSnapshot = await pool.query(
      "SELECT rounds FROM teams WHERE id = $1",
      [teamId],
    );
    const selectedRounds = selectedSnapshot.rows[0]?.rounds || [];
    const oldRounds = oldSnapshot.rows[0]?.rounds || [];
    selectedRounds[round] = [
      {
        name: user.firstName + " " + user.lastName,
        uid: user.id,
        affiliation: user.affiliation,
        rounds: formattedRounds,
      },
    ];
    oldRounds[round] = [];

    await pool.query("UPDATE teams SET rounds = $1::jsonb WHERE id = $2", [
      JSON.stringify(selectedRounds),
      selectedTeam.uid,
    ]);
    await pool.query("UPDATE teams SET rounds = $1::jsonb WHERE id = $2", [
      JSON.stringify(oldRounds),
      teamId,
    ]);
    await pool.query(`UPDATE "user" SET "rounds" = $1::jsonb WHERE id = $2`, [
      JSON.stringify(formattedRounds),
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

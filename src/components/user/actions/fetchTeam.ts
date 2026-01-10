import { Team } from "@/types/users";
import { ensureAppTables, pool } from "@/utils/db";

export async function fetchTeam(id: string) {
  if (id === "") return null;

  await ensureAppTables();
  const { rows } = await pool.query(
    "SELECT id, name, links, members, status, rounds, table_label FROM teams WHERE id = $1",
    [id],
  );
  if (!rows.length) return null;

  const team = rows[0];
  return {
    id: team.id,
    name: team.name,
    links: team.links || {},
    members: team.members || [],
    status: team.status,
    rounds: team.rounds,
    table: team.table_label || "",
  } as Team;
}

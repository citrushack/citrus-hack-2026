import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";
import { ensureAppTables, pool } from "@/utils/db";

const roles = [
  "participants",
  "judges",
  "volunteers",
  "mentors",
  "admins",
  "committees",
  "sponsors",
  "panelists",
];

const orders = {
  shirt: SHIRTS,
  diet: DIETS,
  age: AGES,
  gender: GENDERS,
};

const getStatistic = async (role, status, statistic) => {
  await ensureAppTables();
  const { rows } = await pool.query(
    `SELECT "${statistic}" AS value
     FROM "user"
     WHERE COALESCE((roles->>$1)::int, -2) = $2`,
    [role, status],
  );

  const results = rows.map((row) => row.value);

  const frequency = {};

  for (const option of orders[statistic]) {
    frequency[option] = 0;
  }

  results.forEach((value) => {
    frequency[value] += 1;
  });

  return frequency;
};

export const GET = async () => {
  await ensureAppTables();
  const heatmaps = {};

  for (const statistic of Object.keys(orders)) {
    heatmaps[statistic] = {};

    for (const role of roles) {
      heatmaps[statistic][role] = {
        0: {},
        1: {},
        "-1": {},
      };

      heatmaps[statistic][role]["-1"] = await getStatistic(role, -1, statistic);
      heatmaps[statistic][role]["0"] = await getStatistic(role, 0, statistic);
      heatmaps[statistic][role]["1"] = await getStatistic(role, 1, statistic);
    }
  }

  await Promise.all(
    Object.entries(heatmaps).map(([key, value]) =>
      pool.query(
        `INSERT INTO statistics (key, data)
         VALUES ($1, $2::jsonb)
         ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data`,
        [key, JSON.stringify(value)],
      ),
    ),
  );

  return Response.json(heatmaps);
};

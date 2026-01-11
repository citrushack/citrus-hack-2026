export const dynamic = "force-dynamic";

import { ensureAppTables, pool } from "@/utils/db";
import { AGES, DIETS, GENDERS, SHIRTS } from "@/data/form/information";

const labels: string[] = [
  "participants",
  "judges",
  "volunteers",
  "mentors",
  "admins",
  "committees",
  "sponsors",
  "panelists",
];

const orders: Record<string, string[]> = {
  shirt: SHIRTS,
  diet: DIETS,
  age: AGES,
  gender: GENDERS,
};

const statuses: string[] = ["-1", "0", "1"];

type heatmap = Record<string, Record<string, Record<string, number[]>>>;

export const GET = async () => {
  await ensureAppTables();
  const { rows } = await pool.query("SELECT key, data FROM statistics");

  const heatmaps: heatmap = {};

  rows.forEach((row) => {
    const data = row.data || {};
    heatmaps[row.key] = {};

    labels.forEach((label: string) => {
      heatmaps[row.key][label] = {};

      statuses.forEach((status: string) => {
        heatmaps[row.key][label][status] = [];

        const results = data[label]?.[status] || {};
        const values: number[] = orders[row.key].map(
          (key) => results[key] ?? 0,
        );

        heatmaps[row.key][label][status] = values;
      });
    });
  });

  return Response.json(heatmaps);
};

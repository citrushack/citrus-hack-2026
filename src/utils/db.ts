import { Pool } from "pg";

const postgresUrl = process.env.DB_URL || "";

export const pool = new Pool({ connectionString: postgresUrl });

let tablesReady = false;

export const ensureAppTables = async () => {
  if (tablesReady) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS teams (
      id text PRIMARY KEY,
      name text NOT NULL,
      status integer NOT NULL DEFAULT 0,
      links jsonb NOT NULL DEFAULT '{}'::jsonb,
      members jsonb NOT NULL DEFAULT '[]'::jsonb,
      rounds jsonb,
      table_label text,
      timestamp timestamptz NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ideas (
      id text PRIMARY KEY,
      title text NOT NULL,
      languages jsonb NOT NULL DEFAULT '[]'::jsonb,
      details text NOT NULL,
      contact text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id text PRIMARY KEY,
      rating integer NOT NULL,
      additional_comments text NOT NULL,
      event_source text NOT NULL,
      improvements text NOT NULL,
      not_beneficial text NOT NULL,
      helpful text NOT NULL,
      status integer NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS resumes (
      id text PRIMARY KEY,
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text NOT NULL,
      school text NOT NULL,
      grade text NOT NULL,
      resume text NOT NULL,
      status integer NOT NULL DEFAULT 0
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS statistics (
      key text PRIMARY KEY,
      data jsonb NOT NULL DEFAULT '{}'::jsonb
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id text PRIMARY KEY,
      name text NOT NULL,
      attendance integer NOT NULL DEFAULT 0
    );
  `);

  await pool.query(`
    ALTER TABLE IF EXISTS "user"
      ADD COLUMN IF NOT EXISTS "firstName" text,
      ADD COLUMN IF NOT EXISTS "lastName" text,
      ADD COLUMN IF NOT EXISTS "team" text,
      ADD COLUMN IF NOT EXISTS "photo" text,
      ADD COLUMN IF NOT EXISTS "roles" jsonb,
      ADD COLUMN IF NOT EXISTS "discord" text,
      ADD COLUMN IF NOT EXISTS "phone" text,
      ADD COLUMN IF NOT EXISTS "major" text,
      ADD COLUMN IF NOT EXISTS "age" text,
      ADD COLUMN IF NOT EXISTS "country" text,
      ADD COLUMN IF NOT EXISTS "school" text,
      ADD COLUMN IF NOT EXISTS "grade" text,
      ADD COLUMN IF NOT EXISTS "gender" text,
      ADD COLUMN IF NOT EXISTS "shirt" text,
      ADD COLUMN IF NOT EXISTS "diet" text,
      ADD COLUMN IF NOT EXISTS "affiliation" text,
      ADD COLUMN IF NOT EXISTS "rounds" jsonb,
      ADD COLUMN IF NOT EXISTS "events" jsonb,
      ADD COLUMN IF NOT EXISTS "availability" text,
      ADD COLUMN IF NOT EXISTS "response" text,
      ADD COLUMN IF NOT EXISTS "title" text,
      ADD COLUMN IF NOT EXISTS "panelist" text,
      ADD COLUMN IF NOT EXISTS "company" text,
      ADD COLUMN IF NOT EXISTS "position" text,
      ADD COLUMN IF NOT EXISTS "tier" text,
      ADD COLUMN IF NOT EXISTS "comments" text,
      ADD COLUMN IF NOT EXISTS "eventSource" text,
      ADD COLUMN IF NOT EXISTS "priorExperience" text,
      ADD COLUMN IF NOT EXISTS "priorHackathons" text,
      ADD COLUMN IF NOT EXISTS "timestamp" timestamptz;
  `);

  tablesReady = true;
};

import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS draft_categories (
      _id TEXT PRIMARY KEY,
      name VARCHAR(50),
      color VARCHAR(50),
      icon VARCHAR(50)
    );
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE draft_categories;
  `)
}


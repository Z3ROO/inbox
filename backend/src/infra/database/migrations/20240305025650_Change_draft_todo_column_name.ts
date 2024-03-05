import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE Drafts
    RENAME COLUMN todo TO to_deal;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE Drafts
    RENAME COLUMN to_deal TO todo;
  `);
}

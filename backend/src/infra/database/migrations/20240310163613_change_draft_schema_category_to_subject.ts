import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE Drafts
    RENAME COLUMN category_id TO subject_id;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE Drafts
    RENAME COLUMN subject_id TO category_id;
  `);
}

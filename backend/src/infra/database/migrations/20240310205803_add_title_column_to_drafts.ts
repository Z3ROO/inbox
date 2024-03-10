import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE drafts
    ADD COLUMN title VARCHAR(128) DEFAULT '';
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE drafts
    DROP COLUMN title;
  `);
}


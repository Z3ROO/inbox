import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE draft_categories RENAME TO subjects;
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE subjects RENAME TO draft_categories;
  `)
}


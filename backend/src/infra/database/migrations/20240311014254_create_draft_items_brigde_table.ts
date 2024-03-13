import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("draft_items", table => {
    table.string('parent_draft_id').references('drafts._id').onDelete('CASCADE');
    table.string('child_draft_id').references('drafts._id').onDelete('CASCADE');
    table.primary(['parent_draft_id', 'child_draft_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('draft_items');
}

import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', table => {
    table.string('_id').primary();
    table.string('title').defaultTo('');
    table.string('content').defaultTo('');
    table.integer('priority').defaultTo(0);
    table.string('subject_id').references('subjects._id');
    table.date('created_at');
    table.date('started_at');
    table.date('ended_at');
    table.string('status');
  });

  await knex.schema.createTable('task_items', table => {
    table.string('parent_task_id');
    table.string('child_task_id');
    table.primary(['parent_task_id', 'child_task_id'])
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
  await knex.schema.dropTable('task_items');
}


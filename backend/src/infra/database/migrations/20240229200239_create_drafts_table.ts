import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS drafts (
      _id TEXT PRIMARY KEY NOT NULL,
      content TEXT NOT NULL,
      priority INT DEFAULT 0,
      category_id TEXT REFERENCES draft_categories(_id),
      created_at TIMESTAMP NOT NULL,
      delay VARCHAR(50),
      delay_quantity INT,
      delayed_at TIMESTAMP,
      allowed_after TIMESTAMP,
      todo BOOLEAN DEFAULT false
    );
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE EXISTS drafts ;
  `)
}


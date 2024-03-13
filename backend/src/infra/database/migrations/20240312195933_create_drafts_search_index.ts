import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  knex.raw(`
    BEGIN;

    ALTER TABLE drafts ADD COLUMN content_search_tokens tsvector; 
    UPDATE drafts SET content_search_tokens = to_tsvector('english', coalesce(content, '') || ' ' || coalesce(title, ''));

    CREATE INDEX idx_drafts_content_gin ON drafts USING GIN(content_search_tokens);
    
    COMMIT;
  `)
}


export async function down(knex: Knex): Promise<void> {
  knex.raw(`
    BEGIN;

    DROP INDEX idx_drafts_content_gin;
    
    ALTER TABLE drafts DROP COLUMN content_search_tokens;
    
    COMMIT;
  `)
}


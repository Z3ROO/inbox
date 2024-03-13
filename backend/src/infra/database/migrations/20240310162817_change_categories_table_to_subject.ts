import type { Knex } from "knex";


// export async function up(knex: Knex): Promise<void> {
//   await knex.raw(`
//     ALTER TABLE draft_categories RENAME TO subjects;
//   `)
// }


// export async function down(knex: Knex): Promise<void> {
//   await knex.raw(`
//     ALTER TABLE subjects RENAME TO draft_categories;
//   `)
// }

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    BEGIN;

    ALTER TABLE draft_categories RENAME TO subjects;
    
    ALTER TABLE Drafts
    RENAME COLUMN category_id TO subject_id;

    ALTER TABLE drafts DROP CONSTRAINT drafts_subject_id_fkey;
    ALTER TABLE subjects DROP CONSTRAINT draft_categories_pkey;

    ALTER TABLE subjects ADD CONSTRAINT subjects_pkey PRIMARY KEY (_id);
    ALTER TABLE drafts ADD CONSTRAINT drafts_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(_id);

    COMMIT;
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    BEGIN;

    ALTER TABLE subjects RENAME TO draft_categories;

    ALTER TABLE Drafts
    RENAME COLUMN subject_id TO category_id;

    ALTER TABLE drafts DROP CONSTRAINT drafts_subject_id_fkey;
    ALTER TABLE draft_categories DROP CONSTRAINT subjects_pkey;

    ALTER TABLE draft_categories ADD CONSTRAINT draft_categories_pkey PRIMARY KEY (_id);
    ALTER TABLE drafts ADD CONSTRAINT drafts_category_id_fkey FOREIGN KEY (category_id) REFERENCES draft_categories(_id);

    COMMIT;
  `)
}

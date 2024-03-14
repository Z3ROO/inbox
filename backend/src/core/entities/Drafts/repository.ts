import { IDraft_Schema } from '@/core/entities/Drafts/types';
import { IDraft } from 'shared-types';
import { PostgresRepository } from '@/infra/database/PostgresRepository';

export class DraftsRepository extends PostgresRepository {


  public async findById(draft_id: string) {
    const res = await this.query<IDraft>(`
      SELECT ${DRAFT_PROP_FIELDS}
      FROM drafts 
      ${JOIN_SUBJECT} 
      WHERE drafts._id <= $1;
    `, [draft_id]);
    
    return res;
  }

  async findAllowedAfter(date: Date) {
    
    const res = await this.query<IDraft>(`
      SELECT ${DRAFT_PROP_FIELDS}
      FROM drafts 
      ${JOIN_SUBJECT} 
      WHERE drafts.allowed_after <= $1 AND drafts.to_deal = FALSE 
      ORDER BY drafts.priority DESC, drafts.allowed_after ASC
    `,[date]);

   return res;
  }


  async insertOne(draft: IDraft_Schema) {
    const res = await this.query(`
      INSERT INTO drafts (
          _id, title, content, priority, subject_id, created_at, delay, delay_quantity, 
          delayed_at, allowed_after, to_deal, content_search_tokens
        ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, to_tsvector('english', $12 || ' ' || $13) );
    `, [
      draft._id,
      draft.title,
      draft.content,
      draft.priority,
      draft.subject_id,
      draft.created_at,
      draft.delay,
      draft.delay_quantity,
      draft.delayed_at,
      draft.allowed_after,
      draft.to_deal,
      draft.title || '',
      draft.content || ''
    ]);
    
    res.insertedId = draft._id;
    
    return res;
  }

  async findByBooleanProp({to_deal}: {to_deal:boolean}) {
    //Not completelly implemented, since there's only one boolean property

    const res = await this.query<IDraft>(`
      SELECT ${DRAFT_PROP_FIELDS}
      FROM drafts 
      ${JOIN_SUBJECT} 
      WHERE drafts.to_deal = $1 
      ORDER BY drafts.priority DESC, drafts.allowed_after ASC
    `,[to_deal]);

    return res;
  }

  async updateOne(draft_id: string, properties: Partial<IDraft_Schema>) {
    //const originalDraft = await this.findById(draft_id);

    const res = await this.query(`
      UPDATE drafts 
      SET ${mapHandlers(properties, 1)}
      WHERE drafts._id = $1;
    `, [draft_id, ...Object.values(properties)]);
    
    return res;
  }
 
  async deleteOne(draft_id: string) {
    const res = await this.query(`
      DELETE FROM drafts WHERE drafts._id = $1;
    `,[draft_id]);

    return res;
  }

  async findDraftItems(parent_id: string) {
    const res = await this.query<IDraft>(`
      SELECT ${DRAFT_PROP_FIELDS}
      FROM drafts 
      ${JOIN_SUBJECT} 
      JOIN draft_items ON drafts._id = draft_items.child_draft_id 
      WHERE draft_items.parent_draft_id = $1;
    `, [parent_id]);
    
    return res;
  }

  async searchDrafts(searchText: string) {
    const res = await this.query<IDraft>(`
      SELECT *
      FROM drafts
      WHERE content_search_tokens @@ plainto_tsquery('english', lower($1));
    `, [searchText]);

    return res;
  }
}

export class DraftItemsRepository extends PostgresRepository {
  async attachChild(parent_id: string, child_id: string) {
    const res = await this.query(`
      INSERT INTO draft_items (parent_draft_id, child_draft_id)
      VALUES ($1, $2) ON CONFLICT DO NOTHING;
    `, [parent_id, child_id]);

    return res;

  //   knex('draft_items')
  // .insert({ parent_draft_id: value1, child_draft_id: value2 })
  // .onConflict(['parent_draft_id', 'child_draft_id'])
  // .ignore();
  }

  async detachChild(parent_id: string, child_id: string) {
    const res = await this.query(`
      DELETE from draft_items WHERE parent_draft_id = $1 AND child_draft_id = $2;
    `, [parent_id, child_id]);

    return res;
  }
}

function mapHandlers(properties: {}, startAfter: number = 0) {
  return Object.keys(properties).reduce(
      (acc, key, i) => {
        const comma = i === 0 ? '' : ',';

        return acc + `${comma} ${key} = $${i+1+startAfter}`;
      }
    , '');
}

const SUBJECT_PROP_AS_JSON = `
  jsonb_build_object(
    '_id', subjects._id, 
    'name', subjects.name, 
    'color', subjects.color, 
    'icon', subjects.icon
    ) as subject `;

const JOIN_SUBJECT = `
  LEFT JOIN subjects ON drafts.subject_id = subjects._id 
`

const DRAFT_PROP_FIELDS = `
  drafts._id, title, content, priority, created_at, delay, 
  delay_quantity, delayed_at, allowed_after, to_deal, 
  ${SUBJECT_PROP_AS_JSON}`;
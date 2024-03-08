import { IDraft_Schema } from '@/core/entities/Drafts/types';
import { IDraft } from 'shared-types';
import { PostgresRepository, PostgresRepositoryResponse } from '@/infra/database/PostgresRepository';

export class DraftsRepository extends PostgresRepository {
  public async findById(draft_id: string) {
    const res = await this.query<IDraft>(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, to_deal, 
      jsonb_build_object('_id', draft_categories._id, 'name', draft_categories.name, 'color', draft_categories.color, 'icon', draft_categories.icon) as category 
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category = draft_categories._id 
      WHERE drafts._id <= $1;
    `, [draft_id]);
    
    return res;
  }

  async findAllowedAfter(date: Date) {
    
    const res = await this.query<IDraft>(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, to_deal,
      jsonb_build_object('_id', draft_categories._id, 'name', draft_categories.name, 'color', draft_categories.color, 'icon', draft_categories.icon) as category
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category_id = draft_categories._id
      WHERE drafts.allowed_after <= $1 AND drafts.to_deal = FALSE 
      ORDER BY drafts.priority DESC, drafts.allowed_after ASC
    `,[date]);

   return res;
  }


  async insertOne(draft: IDraft_Schema) {
    const res = await this.query(`
      INSERT INTO drafts (
          _id, content, priority, category_id, created_at, delay, delay_quantity, delayed_at, allowed_after, to_deal
        ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      draft._id,
      draft.content,
      draft.priority,
      draft.category_id,
      draft.created_at,
      draft.delay,
      draft.delay_quantity,
      draft.delayed_at,
      draft.allowed_after,
      draft.to_deal
    ]);
    
    return res;
  }

  async findByBooleanProp({to_deal}: {to_deal:boolean}) {
    //Not completelly implemented, since there's only one boolean property

    const res = await this.query<IDraft>(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, to_deal,
      jsonb_build_object(
        '_id', draft_categories._id, 
        'name', draft_categories.name, 
        'color', draft_categories.color, 
        'icon', draft_categories.icon
        ) as category
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category_id = draft_categories._id
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
}

function mapHandlers(properties: {}, startAfter: number = 0) {
  return Object.keys(properties).reduce(
      (acc, key, i) => {
        const comma = i === 0 ? '' : ',';

        return acc + `${comma} ${key} = $${i+1+startAfter}`;
      }
    , '');
}
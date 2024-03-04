import { IDraftCategory, IDraft, IDraft_Schema, IDraft_Old } from '@/types/Inbox';
import { ObjectId } from 'mongodb';
import { PostgresRepository, PostgresRepositoryResponse } from './default/PostgresRepository';
import { v4 } from 'uuid';


export class DraftCategoryRepoSQL extends PostgresRepository {

  public async findAll() {
    const res = await this.query(`SELECT * FROM draft_categories;`);
    return res;
  }

  public async findById(_id: string|ObjectId): Promise<any> {
    const res = await this.query(`SELECT * FROM draft_categories WHERE draft_categories._id = $1;`, [_id]) as any;
    
    return res;
  }

  public async findByName(name: string) {
    const res = await this.query(`SELECT * FROM draft_categories WHERE draft_categories.name = $1;`, [name]) as any;
    
    return res;
  }

  public async create({_id, name}: {_id?: string, name:string}) {
    if (!_id)
      _id = v4();

    const res = await this.query(`
      INSERT INTO draft_categories (
        _id, name, color, icon
      )
      VALUES ($1, $2, $3, $4);
    `, [_id, name, '#ccc', 'none']);

    return {
      ...res,
      insertedId: _id
    };
  }
}

export class InboxRepositorySQL extends PostgresRepository {
  public async findById(draft_id: string) {
    const res = await this.query<IDraft>(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, todo, 
      jsonb_build_object('_id', draft_categories._id, 'name', draft_categories.name, 'color', draft_categories.color, 'icon', draft_categories.icon) as category 
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category = draft_categories._id 
      WHERE drafts._id <= $1;
    `, [draft_id]);
    
    return res;
  }

  async findAllowedDrafts() {
    const res = await this.query<IDraft>(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, todo,
      jsonb_build_object('_id', draft_categories._id, 'name', draft_categories.name, 'color', draft_categories.color, 'icon', draft_categories.icon) as category
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category_id = draft_categories._id
      WHERE drafts.allowed_after <= CURRENT_TIMESTAMP AND drafts.todo = FALSE 
      ORDER BY drafts.priority DESC, drafts.allowed_after ASC
    `);

   return res;
  }


  async insertDraft(draft: IDraft_Schema) {
    const res = await this.query(`
      INSERT INTO drafts (
          _id, content, priority, category_id, created_at, delay, delay_quantity, delayed_at, allowed_after, todo
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
      draft.todo
    ]);
    
    return res;
  }

  async findAllTodos() {
     const res = await this.query<IDraft>(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, todo,
      jsonb_build_object(
        '_id', draft_categories._id, 
        'name', draft_categories.name, 
        'color', draft_categories.color, 
        'icon', draft_categories.icon
        ) as category
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category_id = draft_categories._id
      WHERE drafts.todo = TRUE 
      ORDER BY drafts.priority DESC, drafts.allowed_after ASC
    `);

    return res;
  }

  async updateDraft(draft_id: string, properties: Partial<IDraft_Schema>) {
    const originalDraft = await this.findById(draft_id);

    const res = await this.query(`
      UPDATE drafts 
      SET ${mapHandlers(properties, 1)}
      WHERE drafts._id = $1;
    `,[draft_id, ...Object.values(properties)]);
    
    return {
      originalValue: originalDraft,
      ...res
    };
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
import { mongodb } from '@/infra/database';
import { IDraftCategory, IDraft, IDraftPG } from '@/types/Inbox';
import { Collection, Db, ObjectId } from 'mongodb';
import { PostgresRepository } from './default/PostgresRepository';
import { v4 } from 'uuid';

const database = mongodb;

export class Repository<DocumentType> {
  protected db: () => Db
  protected dbName: string
  protected collectionName: string

  constructor(dbName: string, collectionName?: string) {
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.db = () => database(dbName);
  }

  protected collection(collectionName?: string): Collection<DocumentType> {
    if (collectionName)
      return this.db().collection(collectionName);
    else {
      if (this.collectionName)
        return this.db().collection(this.collectionName)
      else
        throw new Error('A collection name must be passed');
    }
  }

}

export class InboxRepository extends Repository<IDraft> {
  constructor() {
    super('kagura', 'inbox');
  }

  async findEverything() {
    const result = await this.collection().aggregate([
      {
        $lookup: {
          from: 'draft_category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $addFields: {
          category: {
            $arrayElemAt: ['$category', 0]
          }
        }
      }
    ])
      .toArray();

   return result;
  }

  async findAll() {
    const result = await this.collection().aggregate([
      { $match: {allowed_after:{ $lte: new Date() }, todo: false } },
      {
        $lookup: {
          from: 'draft_category',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $addFields: {
          category: {
            $arrayElemAt: ['$category', 0]
          }
        }
      },
      {
        $sort: {
          priority: -1, 
          allowed_after: 1
        }
      }
    ])
      .toArray();

   return result;
  }

  async findAllTodos() {
    const result = await this.collection()
      .find({todo: true})
      .toArray();

    return result;
  }
  
  async insertOne(draft: IDraft) {
    await this.collection().insertOne(draft);
  }

  async updateDraft(draft_id: string, properties: Partial<IDraft>) {
    const _id = new ObjectId(draft_id);
    const mutation = await this.collection().findOneAndUpdate({_id}, {$set: {...properties}}, { returnDocument: 'before' });
    return {
      originalValue: mutation.value
    }
  }
 
  async deleteOne(draft_id: string) {
    const _id = new ObjectId(draft_id);
    const mutation = await this.collection().findOneAndDelete({_id});
    return {
      originalValue: mutation.value
    }
  }
}


export class DraftCategoryRepo extends Repository<IDraftCategory> {
  constructor() {
    super('kagura', 'draft_category');
  }

  public async findAll() {
    return await this.collection().find({}).toArray();
  }

  public async findById(_id: string|ObjectId) {
    if (typeof _id === 'string')
      _id = new ObjectId(_id);

    return await this.collection().findOne({_id});
  }

  public async findByName(name: string) {
    return await this.collection().findOne({name});
  }

  public async create({name}: {name:string}) {
    const {insertedId} = await this.collection().insertOne({name, color: '#ccc', icon: 'none'});

    return insertedId;
  }
}

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
    const res = await this.query(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, todo, 
      jsonb_build_object('_id', draft_categories._id, 'name', draft_categories.name, 'color', draft_categories.color, 'icon', draft_categories.icon) as category 
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category = draft_categories._id 
      WHERE drafts._id <= $1;
    `, [draft_id]) as any;

    if (!res.data)
      return res;

    res.data.last_delay = {
      amount: res.data.delay,
      quantity: res.data.delay_quantity,
      delayed_at: res.data.delayed_at
    }
    
    return res;
  }

  async findAllowedTasks() {
    const res = await this.query(`
      SELECT 
      drafts._id, content, priority, created_at, delay, 
      delay_quantity, delayed_at, allowed_after, todo,
      jsonb_build_object('_id', draft_categories._id, 'name', draft_categories.name, 'color', draft_categories.color, 'icon', draft_categories.icon) as category
      FROM drafts 
      LEFT JOIN draft_categories ON drafts.category_id = draft_categories._id
      WHERE drafts.allowed_after <= CURRENT_TIMESTAMP AND drafts.todo = FALSE 
      ORDER BY drafts.priority DESC, drafts.allowed_after ASC
    `);
    
    for (const data of res.data) {
      data.last_delay = {
        amount: data.delay,
        quantity: data.delay_quantity,
        delayed_at: data.delayed_at
      }
    }

   return res;
  }

  async insertDraft(draft: IDraftPG) {
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
     const res = await this.query(`
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
    
    for (const data of res.data) {
      data.last_delay = {
        amount: data.delay,
        quantity: data.delay_quantity,
        delayed_at: data.delayed_at
      }
    }

    return res;
  }

  async updateDraft(draft_id: string, properties: Partial<IDraftPG>) {
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
import { database } from '@/infra/database';
import { IInbox } from '@/types/Inbox';
import { Collection, Db, ObjectId } from 'mongodb';

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

export class InboxRepository extends Repository<IInbox> {
  constructor() {
    super('kagura', 'inbox');
  }

  async findAll() {
    const result = await this.collection()
      .find({allowed_after:{ $lte: new Date() }, todo: false })
      .sort({allowed_after: 1})
      .toArray();

   return result;
  }

  async findAllTodos() {
    const result = await this.collection()
      .find({todo: true})
      .toArray();

    return result;
  }
  
  async insertOne(draft: IInbox) {
    await this.collection().insertOne(draft);
  }

  async updateDraft(draft_id: string, properties: Partial<IInbox>) {
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

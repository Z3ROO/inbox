import { database } from '@/infra/database';
import { IInbox } from '@/types/Inbox';
import { Collection, Db, ObjectId, WithId } from 'mongodb';

class Repository<DocumentType> {
  protected db: Db
  protected dbName: string
  protected collectionName: string

  constructor(dbName: string, collectionName?: string) {
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.db = database.db(dbName);
  }

  protected collection(collectionName?: string): Collection<DocumentType> {
    if (collectionName)
      return this.db.collection(collectionName);
    else {
      if (this.collectionName)
        return this.db.collection(this.collectionName)
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
      .find({allowed_after:{ $lte: new Date()}})
      .sort({allowed_after: 1})
      .toArray();
    
    return result;
  }

  async insertOne(inboxItem: IInbox) {
    await this.collection().insertOne(inboxItem);
  }

  async updateItem(inboxItem_id: string, properties: Partial<IInbox>) {
    const _id = new ObjectId(inboxItem_id);
    const mutation = await this.collection().findOneAndUpdate({_id}, {$set: {...properties}}, { returnDocument: 'before' });
    return {
      originalValue: mutation.value
    }
  }

  async deleteOne(inboxItem_id: string) {
    const _id = new ObjectId(inboxItem_id);
    const mutation = await this.collection().findOneAndDelete({_id});
    return {
      originalValue: mutation.value
    }
  }
}
import { database } from '@/infra/database';
import { Collection, Db, ObjectId } from 'mongodb';

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

interface IInbox {
  content: string
  last_delay: {
    amount: string
    delayed_at: Date
  }
  allowed_after: Date
}

class InboxRepository extends Repository<IInbox> {
  constructor() {
    super('kagura', 'inbox');
  }

  async findAll() {
    return await this.collection().find().toArray();
  }

  async updateOne(inboxItem_id: string, properties: Partial<IInbox>) {
    const _id = new ObjectId(inboxItem_id);
    return await this.collection().findOneAndUpdate({_id}, {$set: {...properties}})
  }

  async insertOne(inboxItem: IInbox) {
    await this.collection().insertOne(inboxItem)
  }
}
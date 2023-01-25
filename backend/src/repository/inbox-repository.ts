import { database } from '@/infra/database';
import { Db } from 'mongodb';

class Repository {
  protected db: Db
  protected dbName: string
  protected collectionName: string

  constructor(dbName: string, collectionName?: string) {
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.db = database.db(dbName);
  }

  protected collection(collectionName?: string) {
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

class InboxRepository extends Repository {
  constructor() {
    super('kagura', 'inbox');
  }

  async findAll() {
    return await this.collection().find().toArray();
  }

  updateOne() {

  }

  insertOne() {
    
  }
}
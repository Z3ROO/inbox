import { database } from '@/infra/database';
import { IInbox } from '@/types/Inbox';
import { Collection, Db, ObjectId, WithId } from 'mongodb';

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
    // const result = await this.collection()
    //   .find({allowed_after:{ $lte: new Date()}})
    //   .sort({allowed_after: 1})
    //   .toArray();
    // 
    const result = await this.collection().aggregate([
      {
        $match: {
          allowed_after: { $lte: new Date() }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $sort: {
          allowed_after: 1
        }
      },
      {
        $lookup:
        {
          from: "projects",
          localField: "project.project_id",
          foreignField: "_id",
          as: "project_details"
        }
      },
      {
        $project:
        {
          _id: 1,
          content: 1,
          last_delay: 1,
          allowed_after: 1,
          project:
          {
            $cond: { if: { $eq: [ "$project", null ] }, then: null, else: {
              project_id: "$project.project_id",
              queue: "$project.queue",
              queued_at: "$project.queued_at",
              name: { $arrayElemAt: [ "$project_details.name", 0 ] }
            }}
          }
        }
      }
    ]).toArray()
    return result;
  }
  
  async findAllByProject(project_id: string) {
    const result = await this.collection().find({ project: { project_id } }).toArray();
    return result 
  }

  async findHeadOfQueue(project_id: string) {
    const _id = new ObjectId(project_id);
    const result = await this.collection()
      .find({ 
        "project.project_id": _id,
        $and: [
          { "project.queue": { $ne: null } },
          { "project.queued_at": { $ne: null } }
        ]
      })
      .sort({ "project.queue": 1, "project.queued_at": 1 })
      .limit(1)
      .toArray();

    if (result.length)
      return result[0];

    return null
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

  async enqueueItem(inboxItem_id: string, priority: 0|1|2|3|4|null) {
    const _id = new ObjectId(inboxItem_id);
    const mutation = await this.collection().findOneAndUpdate({_id}, {
      $set: {
        ['project.queue']: priority,
        ['project.queued_at']: new Date()
      }}, { returnDocument: 'before' });
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

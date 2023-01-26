import { InboxRepository } from "@/repository/inbox-repository";
import { IInbox } from "@/types/Inbox";
import { WithId } from "mongodb";

interface IInboxDTO {
  _id: string
  content: string
  amount: 'day'|'week'|'month'|'3months'
}

const DELAY_AMOUNT = { 
  'day': (24*60*60*1000),
  'week': ((24*60*60*1000)*7),
  'month': (((24*60*60*1000)*7)*4),
  '3-months': ((((24*60*60*1000)*7)*4)*3)
}

class UndoCache<T>{
  #cache: T[]
  constructor() {
    this.#cache = []
  }

  get get() {
    return this.#cache.pop()
  }

  set set(value: T) {
    if (this.#cache.length > 20)
      this.#cache.pop();
    this.#cache.push(value);
  }
}

const undoCache = new UndoCache<WithId<IInbox>>();

export class Inbox {
  repository = new InboxRepository();

  public async getItems() {
    return await this.repository.findAll();
  }

  public async insertItem(content: string) {
    await this.repository.insertOne({
      content,
      last_delay: null,
      allowed_after: new Date()
    })
  }

  public async delayItem(inboxItem: IInboxDTO) {
    const { _id, content, amount } = inboxItem;
    const { originalValue } = await this.repository.updateItem(_id, {
      content,
      allowed_after: new Date(Date.now()/* + DELAY_AMOUNT[amount]*/),
      last_delay: {
        delayed_at: new Date(),
        amount
      }
    });

    undoCache.set = originalValue;
  }

  public async removeItem(_id: string) {
    const { originalValue } = await this.repository.deleteOne(_id);
    undoCache.set = originalValue;
  }

  public async undoChange() {
    const { _id, content, last_delay, allowed_after} = undoCache.get;

    if (_id !== undefined)
      await this.repository.updateItem(_id.toHexString(),  {content, last_delay, allowed_after});
  }
}
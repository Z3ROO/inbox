import { InboxRepository } from "@/repository/inbox-repository";
import { IInbox } from "@/types/Inbox";
import { ObjectId, WithId } from "mongodb";

interface IInboxDTO {
  _id: string
  content: string
  amount: 'next'|'day'|'week'|'month'
  quantity?: 1|2|3
}

const DELAY_AMOUNT = {
  'next': (1000),
  'day': (24*60*60*1000),
  'week': ((24*60*60*1000)*7),
  'month': (((24*60*60*1000)*7)*4),
}

class UndoCache<T>{
  #cache: T[]
  constructor() {
    this.#cache = []
  }

  get get() {
    const bit = this.#cache.pop();
    console.log('ttt',this.#cache);
    return bit;
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

  public async getTodos() {
    return await this.repository.findAllTodos();
  }

  public async insertItem(content: string) {
    await this.repository.insertOne({
      content,
      todo: false,
      last_delay: null,
      allowed_after: new Date(),
    })
  }

  public async delayItem(inboxItem: IInboxDTO) {
    let { _id, content, amount, quantity } = inboxItem;
    if (!quantity)
      quantity = 1;
    let allowed_after: Date;
    
    if (amount === 'next')
      allowed_after = new Date();
    else
      allowed_after = new Date(new Date().setHours(4,0,0,0) + (quantity * DELAY_AMOUNT[amount]));

    const { originalValue } = await this.repository.updateItem(_id, {
      content,
      allowed_after,
      last_delay: {
        delayed_at: new Date(),
        amount,
      }
    });

    undoCache.set = originalValue;
  }

  public async toggleTodo(inboxItem_id: string, state: boolean) {
    await this.repository.updateItem(inboxItem_id, {todo: state})
  }

  public async removeItem(inboxItem_id: string) {
    await this.repository.deleteOne(inboxItem_id);
  }

  public async undoChange() {
    const { _id, content, last_delay, allowed_after} = undoCache.get || {};

    if (_id !== undefined)
      await this.repository.updateItem(_id.toHexString(),  { last_delay, allowed_after });
  }
}


import { DraftCategoryRepo, InboxRepository } from "@/repository/inbox-repository";
import { DelayAmount, IInbox } from "@/types/Inbox";
import { ObjectId, WithId } from "mongodb";

interface IInboxDTO {
  _id: string
  content: string
  amount: DelayAmount
  quantity?: 1|2|3
}

const DELAY_AMOUNT = {
  'next': (1000),
  'later': (60*60*1000),
  'dawn': (18*60*60*1000),
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
  categoryRepo = new DraftCategoryRepo();

  public async getInbox() {
    return await this.repository.findAll();
  }

  public async getTodos() {
    return await this.repository.findAllTodos();
  }

  public async getCategories() {
    return await this.categoryRepo.findAll();
  }

  public async insertDraft(content: string, priority: number, category: string, todo?: boolean) {
    if (todo === undefined)
      todo = false;
    
    if (priority == null || priority > 3)
      priority = 0;

    if (category == null || category === '')
      category = 'none';

    let categoryId: ObjectId;
    let categoryObject = await this.categoryRepo.findByName(category);

    if (categoryObject)
      categoryId = categoryObject._id
    else
      categoryId = await this.categoryRepo.create({name: category})

    await this.repository.insertOne({
      content,
      priority,
      category: categoryId,
      todo,
      last_delay: null,
      allowed_after: new Date(),
      created_at: new Date()
    })
  }

  public async updateDraftOrganization({ priority, category, _id }: { _id: string, priority: number, category: string }) {

    if (priority != null) {
      await this.repository.updateDraft(_id, {priority});
    }

    if (category != null && category !== '') {
      let categoryId: ObjectId;
      let categoryObject = await this.categoryRepo.findByName(category);

      if (categoryObject)
        categoryId = categoryObject._id
      else
        categoryId = await this.categoryRepo.create({name: category})

      await this.repository.updateDraft(_id, {category: categoryId});
    }

  }

  public async delayDraft(draft: IInboxDTO) {
    let { _id, content, amount, quantity } = draft;
    
    if (amount === 'none') {
      const { originalValue } = await this.repository.updateDraft(_id, {
        content
      });
      return;
    }
      

    if (!quantity)
      quantity = 1;
    let allowed_after: Date;
    
    if (amount === 'next')
      allowed_after = new Date();
    else if (amount === 'later')
      allowed_after = new Date(Date.now() + DELAY_AMOUNT[amount]);
    else if (amount === 'dawn') {
      if (new Date().getHours() > 17)
        return;

      allowed_after = new Date(new Date().setHours(0,0,0,0) + DELAY_AMOUNT[amount]);
    }
    else
      allowed_after = new Date(new Date().setHours(4,0,0,0) + (quantity * DELAY_AMOUNT[amount]));

    const { originalValue } = await this.repository.updateDraft(_id, {
      content,
      allowed_after,
      last_delay: {
        delayed_at: new Date(),
        amount,
        quantity
      }
    });

    undoCache.set = originalValue;
  }

  public async toggleTodo(draft_id: string, state: boolean) {
    const {originalValue} = await this.repository.updateDraft(draft_id, {todo: state});
    undoCache.set = originalValue;
  }

  public async removeDraft(draft_id: string) {
    await this.repository.deleteOne(draft_id);
  }

  public async undoChange() {
    const { _id, content, last_delay, allowed_after, todo} = undoCache.get || {};

    if (_id !== undefined)
      await this.repository.updateDraft(_id.toHexString(),  { last_delay, allowed_after, todo });
  }
}


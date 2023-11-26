import { DraftCategoryRepoSQL, InboxRepositorySQL } from "@/repository/inbox-repository";
import { DelayAmount, IDraft } from "@/types/Inbox";
import { ObjectId, WithId } from "mongodb";
import { v4 as UUID } from 'uuid';

interface IDraftDTO {
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
    console.log('Cache get:',this.#cache);
    return bit;
  }

  set set(value: T) {
    if (this.#cache.length > 20)
      this.#cache.pop();
    this.#cache.push(value);
  }
}

const undoCache = new UndoCache<WithId<IDraft>>();

export class Inbox {
  repository = new InboxRepositorySQL();
  categoryRepo = new DraftCategoryRepoSQL();

  public async getInbox() {
    const {data, status} = await this.repository.findAllowedTasks();
    return data;
  }

  public async getTodos() {
    const {data, status} = await this.repository.findAllTodos();
    return data;
  }

  public async getCategories() {
    const {data, status} =  await this.categoryRepo.findAll();
    return data;
  }

  public async insertDraft(content: string, priority: number, category: string, todo: boolean = false) {
    
    if (priority == null || priority > 3)
      priority = 0;

    if (category == null || category === '')
      category = 'none';

    let category_id: string;
    let categoryObject = await this.categoryRepo.findByName(category);

    if (categoryObject)
      category_id = categoryObject.data[0]._id
    else
      category_id = (await this.categoryRepo.create({name: category})).insertedId

    
    await this.repository.insertDraft({
      _id: UUID(),
      content,
      priority,
      category_id,
      todo,
      delay: null,
      delay_quantity: null,
      delayed_at: null,
      allowed_after: new Date(),
      created_at: new Date()
    })
  }

  public async updateDraftOrganization({ _id, priority, category, content }: { _id: string, priority: number, category: string, content: string }) {
    // =============================================================================
    //  PREFIRO NAO ATUALIZAR `content` POR AQUI, DEVO MELHORAR ESSA LOGICA.
    // =============================================================================
    if (priority != null) {
      await this.repository.updateDraft(_id, {priority, content});
    }

    if (category != null && category !== '') {
      let category_id: string;
      let categoryObject = (await this.categoryRepo.findByName(category)).data[0];

      if (categoryObject)
        category_id = categoryObject._id
      else
        category_id = (await this.categoryRepo.create({name: category})).insertedId

      await this.repository.updateDraft(_id, {category_id, content});
    }

  }

  public async delayDraft(draft: IDraftDTO) {
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
      allowed_after = new Date(Date.now() + (DELAY_AMOUNT['later']/60));
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
      delay: amount,
      delayed_at: new Date(),
      delay_quantity: quantity      
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
      await this.repository.updateDraft(_id.toHexString(),  { delay: last_delay.amount, delay_quantity: last_delay.quantity, delayed_at: last_delay.delayed_at, allowed_after, todo });
  }
}


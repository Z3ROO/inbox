import { DelayAmount, IDraft } from "@/types/Inbox";
import { Drafts } from "../entities/Drafts";
import { DraftCategories } from "../entities/DraftCategories";

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

export class Inbox {
  drafts = new Drafts();
  draftCategories = new DraftCategories();

  public async getDrafts(): Promise<IDraft[]> {
    const now = new Date();
    const data = await this.drafts.allowedAfter(now);
    return data;
  }

  public async delayDraft(draft: IDraftDTO) {
    let { _id, content, amount, quantity } = draft;

    if (amount === 'none') {
      const { originalValue } = await this.drafts.updateOne(_id, {
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

    const { originalValue } = await this.drafts.updateOne(_id, {
      content,
      allowed_after,      
      delay: amount,
      delayed_at: new Date(),
      delay_quantity: quantity      
    });

    //undoCache.set = originalValue;
  }

  public async insertDraft(content: string, priority: number, category: string, to_deal: boolean = false) {
    return this.drafts.insertOne(content, priority, category, to_deal);
  }

  public async getDraftCategories() {
    return this.draftCategories.getAll();
  }

  public async updateDraftOrganization({ _id, priority, category, content }: { _id: string, priority: number, category: string, content: string }) {
    // =============================================================================
    //  PREFIRO NAO ATUALIZAR `content` POR AQUI, DEVO MELHORAR ESSA LOGICA.
    // =============================================================================
    if (priority != null) {
      await this.drafts.updateOne(_id, {priority, content});
    }

    if (category != null && category !== '') {
      let category_id: string;
      let categoryObject = (await this.draftCategories.getByName(category)).data[0];

      if (categoryObject)
        category_id = categoryObject._id;
      else
        category_id = (await this.draftCategories.insertOne({name: category})).insertedId;

      await this.drafts.updateOne(_id, {category_id, content});
    }
  }

  public async removeDraft(draft_id:string) {
    await this.drafts.deleteOne(draft_id);
  }

}
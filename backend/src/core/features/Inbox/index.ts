import { DelayDraftDTO, DraftDelayAmount, IDraft } from "shared-types";
import { Drafts } from "../../entities/Drafts";
import { Subjects } from "../../entities/Subjects";

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
  subjects = new Subjects();

  public async getDrafts(): Promise<IDraft[]> {
    const now = new Date();
    const data = await this.drafts.allowedAfter(now);
    return data;
  }

  public async delayDraft(DTO: DelayDraftDTO): Promise<void> {
    let { _id, content, amount, quantity } = DTO;

    if (amount === 'none') {
      /*const { originalValue } =*/ await this.drafts.updateOne(_id, {
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

    /*const { originalValue } =*/ await this.drafts.updateOne(_id, {
      content,
      allowed_after,      
      delay: amount,
      delayed_at: new Date(),
      delay_quantity: quantity      
    });

    //undoCache.set = originalValue;
    return;
  }

  public async updateDraftOrganization({ _id, title, priority, subject, content }: { _id: string, title: string,  priority: number, subject: string, content: string }): Promise<void> {
    // =============================================================================
    //  PREFIRO NAO ATUALIZAR `content` POR AQUI, DEVO MELHORAR ESSA LOGICA.
    // =============================================================================
    if (priority != null) {
      await this.drafts.updateOne(_id, {priority, content});
    }

    if (subject != null && subject !== '') {
      let subject_id: string;
      let subjectObject = await this.subjects.getByName(subject);

      if (subjectObject)
        subject_id = subjectObject._id;
      else
        subject_id = (await this.subjects.insertOne({name: subject})).insertedId;

      await this.drafts.updateOne(_id, {subject_id, title, content});
    }

    return;
  }

  public async removeDraft(draft_id:string): Promise<void> {
    await this.drafts.deleteOne(draft_id);
    return;
  }

}
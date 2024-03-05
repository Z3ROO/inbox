import { InboxRepositorySQL } from "@/repository/inbox-repository";
import { Drafts } from "../entities/Drafts";
import { DraftCategories } from "../entities/DraftCategories";

export class ToDeal {
  drafts = new Drafts();
  draftCategories = new DraftCategories();
  /*
    Migrate schema from todo to to_deal
  */
  public async getDrafts() {
    const {data, status} = await this.drafts.byBooleanProp({todo: true});
    return data;
  }

  public async toggle(draft_id: string, state: boolean) {
    const {originalValue} = await this.drafts.updateOne(draft_id, {todo: state});
    //undoCache.set = originalValue;
  }

  public async getDraftCategories() {
    return this.draftCategories.getAll();
  }

  public async insertDraft(content: string, priority: number, category: string, todo: boolean = false) {
    return this.drafts.insertOne(content, priority, category, todo);
  }

  public async removeDraft(draft_id:string) {
    await this.drafts.deleteOne(draft_id);
  }
}
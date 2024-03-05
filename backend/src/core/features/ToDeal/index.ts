import { Drafts } from "../../entities/Drafts";
import { DraftCategories } from "../../entities/DraftCategories";
import { IDraft } from "@/types/Inbox";

export class ToDeal {
  drafts = new Drafts();
  draftCategories = new DraftCategories();

  public async getDrafts(): Promise<IDraft[]> {
    const data = await this.drafts.byBooleanProp({to_deal: true});
    return data;
  }

  public async toggle(draft_id: string, state: boolean) {
    const {originalValue} = await this.drafts.updateOne(draft_id, {to_deal: state});
    //undoCache.set = originalValue;
  }

  public async removeDraft(draft_id:string) {
    await this.drafts.deleteOne(draft_id);
  }
}
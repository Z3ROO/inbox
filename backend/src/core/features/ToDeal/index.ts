import { Drafts } from "../../entities/Drafts";
import { IDraft } from "shared-types";

export class ToDeal {
  drafts = new Drafts();

  public async getDrafts(): Promise<IDraft[]> {
    const data = await this.drafts.byBooleanProp({to_deal: true});
    return data;
  }

  public async toggle(draft_id: string, state: boolean): Promise<void> {
    /*const { originalValue } =*/ await this.drafts.updateOne(draft_id, {to_deal: state});
    //undoCache.set = originalValue;
    return;
  }

  public async removeDraft(draft_id:string): Promise<void> {
    await this.drafts.deleteOne(draft_id);
    return;
  }
}
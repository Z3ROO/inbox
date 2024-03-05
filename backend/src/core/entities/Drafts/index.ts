import { IDraft, IDraft_Schema } from "@/types/Inbox";
import { v4 as UUID } from 'uuid';
import { DraftCategories } from "../DraftCategories";
import { DraftsRepository } from "./repository";

export class Drafts {
  draftCategories = new DraftCategories();
  draftsRepo = new DraftsRepository();

  public async allowedAfter(date: Date): Promise<IDraft[]> {
    const { data } = await this.draftsRepo.findAllowedAfter(date);
    return data;
  }

  public async byBooleanProp(properties: {to_deal: boolean}): Promise<IDraft[]> {
    const { data } = await  this.draftsRepo.findByBooleanProp(properties);
    return data;
  }

  public async insertOne(content: string, priority: number, category: string, to_deal: boolean = false) {
    
    if (priority == null || priority > 3)
      priority = 0;

    if (category == null || category === '')
      category = 'none';

    let category_id: string;
    let categoryObject = await this.draftCategories.getByName(category);

    if (categoryObject)
      category_id = categoryObject.data[0]._id;
    else
      category_id = (await this.draftCategories.insertOne({name: category})).insertedId;

    
    await this.draftsRepo.insert({
      _id: UUID(),
      content,
      priority,
      category_id,
      to_deal,
      delay: null,
      delay_quantity: null,
      delayed_at: null,
      allowed_after: new Date(),
      created_at: new Date()
    })
  }

  public async updateOne(draft_id: string, properties: Partial<IDraft_Schema>) {
    return this.draftsRepo.updateOne(draft_id, properties);
  }

  public async deleteOne(draft_id: string) {
    await this.draftsRepo.deleteOne(draft_id);
  }
}
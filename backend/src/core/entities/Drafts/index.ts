import { IDraft_Schema } from "@/core/entities/Drafts/types";
import { IDraft, InsertDraftDTO, AttachDraftItemDTO, DraftItemDTO } from "shared-types";
import { v4 as UUID } from 'uuid';
import { Subjects } from "../Subjects";
import { DraftItemsRepository, DraftsRepository } from "./repository";
import { Tasks } from "../Tasks";
import { ServerError } from "@/util/error/ServerError";

export class Drafts {
  subjects = new Subjects();
  draftsRepo = new DraftsRepository();
  draftItemsRepo = new DraftItemsRepository();
  tasks = new Tasks();

  public async allowedAfter(date: Date): Promise<IDraft[]> {
    const { data } = await this.draftsRepo.findAllowedAfter(date);
    return data;
  }

  public async byBooleanProp(properties: {to_deal: boolean}): Promise<IDraft[]> {
    const { data } = await  this.draftsRepo.findByBooleanProp(properties);
    return data;
  }

  public async byId(_id: string) {
    const { data } = await this.draftsRepo.findById(_id);
    
    if (data.length === 0)
      throw new ServerError("Draft not fount. Id used: "+_id);

    return data[0];
  }

  public async insertOne({ title, content, priority, subject, to_deal, draft_items }: InsertDraftDTO) {
    
    if (title == null)
      title = '';

    title = title.trim();
    
    if (to_deal == null)
      to_deal = false;

    if (priority == null || priority > 3)
      priority = 0;

    if (subject == null || subject === '')
      subject = 'none';

    let subject_id: string;
    let subjectObject = await this.subjects.getByName(subject);

    if (subjectObject)
      subject_id = subjectObject._id;
    else
      subject_id = (await this.subjects.insertOne({name: subject})).insertedId;

    const newDraft_id = UUID();
    
    const dbResponse = await this.draftsRepo.insertOne({
      _id: newDraft_id,
      title,
      content,
      priority,
      subject_id,
      to_deal,
      delay: null,
      delay_quantity: null,
      delayed_at: null,
      allowed_after: new Date(),
      created_at: new Date()
    });

    if (draft_items)
      this.attachDraftItems(newDraft_id, draft_items);

    return dbResponse;
  }

  public async updateOne(draft_id: string, properties: Partial<IDraft_Schema>, draft_items?: DraftItemDTO[]) {
    const dbResponse = await this.draftsRepo.updateOne(draft_id, properties);

    if (draft_items)
      this.attachDraftItems(draft_id, draft_items);

    return dbResponse;
  }

  public async attachDraftItems(parent_draft_id: string, draft_items: DraftItemDTO|DraftItemDTO[]) {
    if (!Array.isArray(draft_items))
      draft_items = [draft_items];

    for await (let item of draft_items) {
      if (item.type === 'existing') {
        await this.draftItemsRepo.attachChild(parent_draft_id, item.value);
      }
      else if (item.type === 'new') {
        const {insertedId} = await this.insertOne({content: item.value});
        await this.draftItemsRepo.attachChild(parent_draft_id, insertedId);
      }
    }
  }

  public async toTask(draft_id: string) {
    const {
      title,
      content,
      priority,
      subject
    } = await this.byId(draft_id);
    
    const items = await this.getDraftItems(draft_id);

    const {insertedId: task_id} = await this.tasks.insertOne({
      title,
      content,
      priority,
      subject_id: subject._id || null
    })
    
    await this.deleteOne(draft_id);
    console.log(items);

    console.log('GET THIS BETTER');

    for (const item of items) {
      const {insertedId: item_id} = await this.tasks.insertOne({
        title: item.title,
        content: item.content,
        priority: item.priority,
        subject_id: item.subject._id || null
      })
      
      await this.deleteOne(item._id);
      await this.tasks.attachChild(task_id, {type: 'existing', value: item_id});
    }
  }

  public async detachDraftItem(parent_draft_id: string, child_draft_id: string) {
    return this.draftItemsRepo.detachChild(parent_draft_id, child_draft_id);
  }

  public async getDraftItems(parent_id: string): Promise<IDraft[]> {
    const items = await this.draftsRepo.findDraftItems(parent_id);
    return items.data;
  }

  public async searchDrafts(searchText: string) {
    const response = await this.draftsRepo.searchDrafts(searchText);

    return response.data;
  }

  public async deleteOne(draft_id: string) {
    return this.draftsRepo.deleteOne(draft_id);
  }
}
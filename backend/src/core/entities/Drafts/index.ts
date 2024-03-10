import { IDraft_Schema } from "@/core/entities/Drafts/types";
import { IDraft, InsertDraftDTO } from "shared-types";
import { v4 as UUID } from 'uuid';
import { Subjects } from "../Subjects";
import { DraftsRepository } from "./repository";

export class Drafts {
  subjects = new Subjects();
  draftsRepo = new DraftsRepository();

  public async allowedAfter(date: Date): Promise<IDraft[]> {
    const { data } = await this.draftsRepo.findAllowedAfter(date);
    return data;
  }

  public async byBooleanProp(properties: {to_deal: boolean}): Promise<IDraft[]> {
    const { data } = await  this.draftsRepo.findByBooleanProp(properties);
    return data;
  }

  public async insertOne({ title, content, priority, subject, to_deal }: InsertDraftDTO) {
    
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

    
    await this.draftsRepo.insertOne({
      _id: UUID(),
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
    })
  }

  public async updateOne(draft_id: string, properties: Partial<IDraft_Schema>) {
    return this.draftsRepo.updateOne(draft_id, properties);
  }

  public async deleteOne(draft_id: string) {
    return this.draftsRepo.deleteOne(draft_id);
  }
}
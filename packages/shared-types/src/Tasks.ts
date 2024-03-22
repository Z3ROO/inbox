import { AttachDraftItemDTO } from './Drafts';
import { ISubject } from './Subjects';

export interface ITask {
  _id: string
  title: string
  content: string
  priority: number
  subject: ISubject
  created_at: Date
  started_at: Date|null
  ended_at: Date|null
  status: TaskStatus
}

export interface InsertTaskDTO {
  title?: string
  content: string
  priority?: number
  subject_id?: string
  parent_id?: string
}

export interface TransformDraftToTaskDTO {
  draft_id: string
}

export type AttachTaskItemDTO = AttachDraftItemDTO;

export interface ActOnTaskDTO {
  task_id: string
  action: TaskStatus
}

export type TaskStatus = 'pending' | 'in progress' | 'paused' | 'completed' | 'cancelled';//  | 'blocked' | 'reassigned' | 'review'
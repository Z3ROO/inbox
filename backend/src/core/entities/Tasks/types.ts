import { TaskStatus } from "shared-types"

export interface Task_Schema {
  _id: string
  title: string
  content: string
  priority: number
  subject_id: string
  created_at: Date
  started_at: Date
  ended_at: Date
  status: TaskStatus
}


export interface TaskItems_Schema {
  parent_draft_id: string
  child_draft_id: string
}
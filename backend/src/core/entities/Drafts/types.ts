import { DraftDelayAmount } from "shared-types"

export interface IDraft_Schema {
  _id: string
  title: string
  content: string
  priority: number
  subject_id: string
  delay: null | DraftDelayAmount|"remove"|"undo"|"organization";
  delayed_at: Date
  delay_quantity: 1|2|3
  to_deal: boolean
  allowed_after: Date
  created_at: Date
  content_search_tokens?: null
}


export interface DraftItems_Schema {
  parent_draft_id: string
  child_draft_id: string
}

// export interface ITask_Schema extends IDraft_Schema {
//   started_at: Date|null
//   finished_at: Date|null
//   complete: boolean
// }
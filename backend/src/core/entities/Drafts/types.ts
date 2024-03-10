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
}
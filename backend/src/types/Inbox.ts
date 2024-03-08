import { DraftDelayAmount } from "shared-types"

export interface IDraft_Schema {
  _id: string
  content: string
  priority: number
  category_id: string
  delay: null | DraftDelayAmount|"remove"|"undo"|"organization";
  delayed_at: Date
  delay_quantity: 1|2|3
  to_deal: boolean
  allowed_after: Date
  created_at: Date
}
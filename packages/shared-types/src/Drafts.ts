import { ISubject } from "./Subjects"

export interface IDraft {
  _id: string
  title: string
  content: string
  priority: number
  subject: ISubject
  delay: null | DraftDelayAmount
  delayed_at: Date
  delay_quantity: 1|2|3
  to_deal: boolean
  allowed_after: Date
  created_at: Date
}

export type DraftDelayAmount = 'none'|'next'|'later'|'dawn'|'day'|'week'|'month';



export interface InsertDraftDTO {
  title?: string
  content: string
  priority?: number
  subject?: string
  to_deal?: boolean
}

export interface DraftUpdateDTO {
  title?: string
  content?: string
  draft_id: string
  action: DraftDelayAmount|"remove"|"undo"|"organization"
  priority?: number
  subject?: string
  quantity?: 1|2|3
}

export interface DelayDraftDTO {
  _id: string
  title?: string
  content: string
  amount: DraftDelayAmount|"remove"|"undo"|"organization"
  quantity?: 1|2|3
}
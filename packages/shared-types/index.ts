export interface IDraft {
  _id: string
  content: string
  priority: number
  category: IDraftCategory
  delay: null | DraftDelayAmount
  delayed_at: Date
  delay_quantity: 1|2|3
  to_deal: boolean
  allowed_after: Date
  created_at: Date
}

export interface InsertDraftDTO {
  content: string
  priority?: number
  category?: string
  to_deal?: boolean
}


export interface IDraftCategory {
  _id: string
  name: string
  color: string
  icon: string
}

export interface DraftCategoryDTO {
  name: string
}


export interface ToggleToDealDTO {
  draft_id: string
  state: boolean
}

export interface DraftUpdateDTO {
  content?: string,
  draft_id: string,
  action: DraftDelayAmount|"remove"|"undo"|"organization";
  priority?: number
  category?: string
  quantity?: 1|2|3
}

export type DraftDelayAmount = 'none'|'next'|'later'|'dawn'|'day'|'week'|'month';

export interface APIResponse<Data = null> {
  success: boolean
  data: Data
  statusCode: number
  message: string
}

export interface DelayDraftDTO {
  _id: string
  content: string
  amount: DraftDelayAmount|"remove"|"undo"|"organization";
  quantity?: 1|2|3
}
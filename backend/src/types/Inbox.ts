export type DelayAmount = 'none'|'next'|'later'|'dawn'|'day'|'week'|'month';

export interface IDraft {
  _id: string
  content: string
  priority: number
  category: IDraftCategory
  delay: null | DelayAmount
  delayed_at: Date
  delay_quantity: 1|2|3
  to_deal: boolean
  allowed_after: Date
  created_at: Date
}

export interface IDraft_Schema {
  _id: string
  content: string
  priority: number
  category_id: string
  delay: null | DelayAmount
  delayed_at: Date
  delay_quantity: 1|2|3
  to_deal: boolean
  allowed_after: Date
  created_at: Date
}

export interface IDraft_Schema_Old {
  _id: string
  content: string
  priority: number
  category_id: string
  delay: null | DelayAmount
  delayed_at: Date
  delay_quantity: 1|2|3
  todo: boolean
  allowed_after: Date
  created_at: Date
}

export interface IDraft_Old {
  _id: string
  content: string
  last_delay: null|{
    amount: DelayAmount, 
    delayed_at: Date, 
    quantity: 1|2|3
  },
  priority: number
  category: IDraftCategory
  allowed_after: Date
  created_at: Date
}

export interface IDraftCategory {
  _id: string
  name: string
  color: string
  icon: string
}

import { ObjectId } from "mongodb"

export type DelayAmount = 'none'|'next'|'later'|'dawn'|'day'|'week'|'month'

export interface IDraft {
  content: string
  priority: number
  category: ObjectId
  last_delay: null | {
    amount: DelayAmount
    delayed_at: Date
    quantity: 1|2|3
  }
  todo: boolean
  allowed_after: Date
  created_at: Date
}

export interface IDraftPG {
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

export interface IDraftCategory {
  name: string
  color: string
  icon: string
}
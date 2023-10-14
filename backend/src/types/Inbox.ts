
export type DelayAmount = 'next'|'later'|'dawn'|'day'|'week'|'month'

export interface IInbox {
  content: string
    last_delay: null | {
    amount: DelayAmount
    delayed_at: Date
    quantity: 1|2|3
  }
  todo: boolean
  allowed_after: Date
}

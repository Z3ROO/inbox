
export interface IInbox {
  content: string
    last_delay: null | {
    amount: 'next'|'day'|'week'|'month'
    delayed_at: Date
    quantity: 1|2|3
  }
  todo: boolean
  allowed_after: Date
}

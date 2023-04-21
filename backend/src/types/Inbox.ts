
export interface IInbox {
  content: string
    last_delay: null | {
    amount: 'next'|'day'|'week'|'month'|'3-months'
    delayed_at: Date
  }
  allowed_after: Date
}

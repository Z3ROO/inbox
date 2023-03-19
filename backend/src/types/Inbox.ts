
export interface IInbox {
  content: string
    last_delay: null | {
    amount: 'day'|'week'|'month'|'3months'
    delayed_at: Date
  }
  allowed_after: Date
}

export interface IInbox {
  content: string
  last_delay: {
    amount: 'day'|'week'|'month'|'3months'
    delayed_at: Date
  }
  allowed_after: Date
}
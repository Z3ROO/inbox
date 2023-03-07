export interface IInbox {
  content: string
  project: {
    project_id: string
    queue: 0|1|2|3|4|null
  }|null
  last_delay: null | {
    amount: 'day'|'week'|'month'|'3months'
    delayed_at: Date
  }
  allowed_after: Date
}

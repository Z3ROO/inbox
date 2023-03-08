export interface Project {
  name: string
  description: string
  created_at: Date
  focused: boolean
  attachments: {
    inbox: boolean
    queue: boolean
  }
}

export interface ProjectQueueNode {
  content: string
  priority: 0|1|2|3|4
  queued_at: Date
}

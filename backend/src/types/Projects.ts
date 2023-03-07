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

export interface IProject {
  _id: string
  name: string
  description: string
  created_at: Date
  focused: boolean
  attachments: {
    inbox: boolean
  }
}

export type ListOfProjects = Omit<IProject, 'created_at' | 'focused' | 'attachments'>[];

export interface IProjectQueueNode {
  requirements: string
  priority: number
  queued_at: Date
}

export type ProjectUpdatableInfoFields = Omit<IProject, '_id'|'attachments'|'created_at'>


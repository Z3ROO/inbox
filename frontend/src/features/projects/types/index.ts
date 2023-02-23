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

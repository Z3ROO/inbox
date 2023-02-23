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

export type ListOfFocusedProjects = Omit<IProject, 'created_at' | 'focused' | 'attachments'>[];

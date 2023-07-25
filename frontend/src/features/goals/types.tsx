export interface IGoal {
  _id: string
  title: string
  description: string
  tasks: ITask[]
}

export interface ITask {
  description: string
  complete: boolean
}
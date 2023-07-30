import { ObjectId } from "mongodb"

export interface IGoal {
  title: string
  description: string
  active: boolean
  focused: boolean
  position: number|null
  finished: boolean
  created_at: Date
  activated_at: Date|null
  finished_at: Date|null
  tasks: ITask[]
}

export interface INewGoal {
  title: string
  description: string
  tasks: {
    description: string
  }[]
}

export interface ITask {
  _id: ObjectId
  description: string
  complete: boolean
  completed_at: Date|null
}

export interface EditGoalDTO {
  _id: string
  title?: string
  description?: string
  tasks?: {
    _id?: string
    description: string
  }[]
  deletedTasks?: string[]
}
export interface IGoal {
  _id: string
  title: string
  description: string
  active: boolean
  focused: boolean
  position: number
  finished: boolean
  created_at: Date
  finished_at: Date|null
  tasks: ITask[]
}

export interface ITask {
  _id: string
  description: string
  complete: boolean
}

export interface CompleteTaskDTO {
  goal_id: string
  task_id: string
}

export interface CompleteTaskResponse {
  task_id: string
  currentState: boolean
}

export interface AddGoalDTO {
  title: string
  description: string
  tasks: {
    description: string
  }[]
}

export interface EditGoalDTO {
  title?: string
  description?: string
  tasks?: {
    _id?: string
    description: string
  }[]
  deletedTasks?: {
    _id: string
    description: string
  }[]
}

export interface FocusGoalDTO {
  goal_id: string
  focus?: boolean 
}

export interface ActivateGoalDTO {
  goal_id: string
  activate?: boolean 
}
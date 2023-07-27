export interface IGoal {
  _id: string
  title: string
  description: string
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
  current_state: boolean
}
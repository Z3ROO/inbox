import { UseMutationResult, UseQueryResult } from "react-query"

export interface IKagura {
  type: 'Theoretical'
  routines: IRoutine[]
}

export interface IRoutine {
  category: string
  cards: ICard[]
}  

export interface ICard {
  _id: string
  requirements: string
  // level: number
  // allowed_after: Date
  // history: {
  //   direction: -1|0|1
  //   started_at: Date
  //   finished_at: Date
  // }
}

export type KagurasType = string
export type KagurasCategory = string

export type KagurasCardEngageDate = Date

export type RoutineState = [KagurasType, KagurasCategory]|null

export interface IKaguraContext {
  performingRoutine: RoutineState|null
  setPerformingRoutine: React.Dispatch<React.SetStateAction<RoutineState>>
  kagura: UseQueryResult<IKagura[], unknown>
  evaluateCard: UseMutationResult<void, unknown, {
      card_id: string
      note: 0 | 1 | -1
      started_at: Date
      finished_at: Date
  }, unknown>
}
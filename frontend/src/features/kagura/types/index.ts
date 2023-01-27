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
  //   date: Date
  // }
}
export type RoutineState = [string, string]|null;

export interface IKaguraContext {
  routine: [string, string]|null;
  setRoutine: React.Dispatch<React.SetStateAction<RoutineState>>
  kagura: UseQueryResult<IKagura[], unknown>
  evaluateCard: UseMutationResult<void, unknown, {
    card_id: string;
    note: 0 | 1 | -1;
}, unknown>
}
import { UseQueryResult } from "react-query"
import { EvaluateCardDTO, RemoveCardDTO } from "../api"
import { Mutation } from '@/lib/query';

export interface RehearsalByType {
  type: RehearsalType 
  decks: RehearsalDeck[]
}

export interface RehearsalDeck {
  category: string
  cards: RehearsalCard[]
}  

export interface RehearsalCard {
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

export type RehearsalType = 'Theoretical'|'Practical'
export type RehearsalCategory = string

export type RehearsalCardEngageDate = Date

export type RoutineState = [RehearsalType, RehearsalCategory]|null

export interface RehearsalContext {
  performingRoutine: RoutineState|null
  setPerformingRoutine: React.Dispatch<React.SetStateAction<RoutineState>>
  rehearsalDecks: UseQueryResult<RehearsalByType[], unknown>
  evaluateCard: Mutation<{}, EvaluateCardDTO>
  insertCard: Mutation<{}, RehearsalCardDTO>
  removeCard: Mutation<{}, RemoveCardDTO>
}

export interface RehearsalCardDTO {
  type: RehearsalType
  requirements: string
  category: RehearsalCategory
  difficulty: 1|2|3
}

export interface RehearsalOptions {
  types: RehearsalType[]
  categories: RehearsalCategory[]
}


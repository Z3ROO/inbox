export interface IKagura {
  type: 'Theoretical'
  routines: IRoutine[]
}

export interface IRoutine {
  category: string
  cards: ICard[]
}  

export interface ICard {
  requirements: string
  area: string
  type: string
  category: string
  level: number
  difficulty: 1|2|3
  allowed_after: Date
  history: {
    direction: -1|0|1
    started_at: Date
    finished_at: Date
  }[]
}

export interface ICardDTO {
  _id: string
  allowed_after: Date
  history: {
    direction: -1|0|1
    started_at: Date
    finished_at: Date
  }
}

export interface INewCardDTO {
  area: string
  requirements: string
  type: string
  category: string
  difficulty: 1|2|3
}


export type KagurasType = string
export type KagurasCategory = string

export interface KaguraCardDTO {
  type: KagurasType
  requirements: string
  category: KagurasCategory
}

export interface KaguraMetaData {
  types: KagurasType[]
  categories: KagurasCategory[]
}

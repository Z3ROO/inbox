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
  type: string
  category: string
  level: number
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
  requirements: string
  type: string
  category: string
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
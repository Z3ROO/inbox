
export interface DraftDTO {
  content?: string,
  draft_id: string,
  action: DraftDelayAmounts|"remove"|"undo"|"organization";
  priority?: number
  category?: string
  quantity?: 1|2|3
}

export interface ToggleTodoDTO {
  draft_id: string
  state: boolean
}

export interface IFilterPanelContext {
  inboxFilterTextarea: string
  setInboxFilterTextarea: React.Dispatch<React.SetStateAction<string>>
  isFilterPanelOpen: boolean
  toggleFilterPanel: () => void
}


export interface IDraft {
  _id: string
  content: string
  last_delay: null|{
    amount: DraftDelayAmounts, 
    delayed_at: Date, 
    quantity: 1|2|3
  },
  priority: number
  category: IDraftCategory
  allowed_after: Date
  created_at: Date
}

export interface IDraftCategory {
  _id: string
  name: string
  color: string
  icon: string
}

export type DraftDelayAmounts = 'none'|'next'|'later'|'dawn'|'day'|'week'|'month';

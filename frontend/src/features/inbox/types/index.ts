
export interface InboxItemDTO {
  content?: string,
  inboxItem_id: string,
  action: InboxDelayAmounts|"remove"|"undo";
  quantity?: 1|2|3
}

export interface ToggleTodoDTO {
  inboxItem_id: string
  state: boolean
}

export interface IFilterPanelContext {
  inboxFilterTextarea: string
  setInboxFilterTextarea: React.Dispatch<React.SetStateAction<string>>
  isFilterPanelOpen: boolean
  toggleFilterPanel: () => void
}


export interface IInboxItem {
  _id: string
  content: string
  last_delay: null|{
    amount: InboxDelayAmounts, 
    delayed_at: Date, 
    quantity: 1|2|3
  },
  allowed_after: Date
}

export type InboxDelayAmounts = 'next'|'day'|'week'|'month';

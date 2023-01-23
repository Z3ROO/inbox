
export interface IFilterPanelContext {
  inboxFilterText: string
  setInboxFilterText: React.Dispatch<React.SetStateAction<string>>
  isFilterPanelOpen: boolean
  toggleFilterPanel: () => void
  updateInboxItem: (amount: InboxDelayAmounts) => Promise<void>
  undoInboxItemUpdate: () => Promise<void>
  removeInboxItem: () => Promise<void>
  inboxItems: IInboxItem[]|undefined
  getInboxItems: () => Promise<void>
}

export interface IInboxItem {
  content: string
  last_delay: null|{
    amount: InboxDelayAmounts, 
    delayed_at: Date, 
    allowed_after: Date
  }
}

export type InboxDelayAmounts = 'day'|'week'|'month'|'year';
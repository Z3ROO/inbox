import { UseMutationResult, UseQueryResult } from "react-query/types/react"

export interface IFilterPanelContext {
  inboxFilterText: string
  setInboxFilterText: React.Dispatch<React.SetStateAction<string>>
  isFilterPanelOpen: boolean
  toggleFilterPanel: () => void
  updateInboxItem: UseMutationResult<any, unknown, {
      action: "day" | "week" | "month" | "3months"|"remove"|"undo";
    }, unknown>
  inboxItems: UseQueryResult<IInboxItem[]>
}

export interface IInboxItem {
  content: string
  last_delay: null|{
    amount: InboxDelayAmounts, 
    delayed_at: Date, 
  },
  allowed_after: Date
}

export type InboxDelayAmounts = 'day'|'week'|'month'|'3months';
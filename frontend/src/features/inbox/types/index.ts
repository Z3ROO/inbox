import { UseMutationResult, UseQueryResult } from "react-query/types/react"

export interface IFilterPanelContext {
  panelMode: PanelMode
  setPanelMode: React.Dispatch<React.SetStateAction<PanelMode>>
  inboxFilterText: string
  setInboxFilterText: React.Dispatch<React.SetStateAction<string>>
  isFilterPanelOpen: boolean
  toggleFilterPanel: () => void
  updateInboxItem: UseMutationResult<any, unknown, {
      content?: string,
      inboxItem_id: string,
      action: "day" | "week" | "month" | "3months"|"remove"|"undo";
    }, unknown>
  //insertInboxItem: UseMutationResult<any, unknown, { content: string }, unknown>
  inboxItems: UseQueryResult<IInboxItem[]>
}

export type PanelMode = 'normal' | 'select-project' | 'enqueue'

export interface IInboxItem {
  _id: string
  content: string
  project: { 
    name: string
    queue_priority: 0|1|2|3|4|null
  }|null
  last_delay: null|{
    amount: InboxDelayAmounts, 
    delayed_at: Date, 
  },
  allowed_after: Date
}

export type InboxDelayAmounts = 'day'|'week'|'month'|'3months';

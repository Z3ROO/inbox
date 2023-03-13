import { Mutation } from "@/lib/query"
import { UseQueryResult } from "react-query/types/react"

export interface IFilterPanelContext {
  panelMode: PanelMode
  setPanelMode: React.Dispatch<React.SetStateAction<PanelMode>>
  inboxFilterText: string
  setInboxFilterText: React.Dispatch<React.SetStateAction<string>>
  isFilterPanelOpen: boolean
  toggleFilterPanel: () => void
  updateInboxItem: Mutation<{}, {
      content?: string,
      inboxItem_id: string,
      action: "day" | "week" | "month" | "3months"|"remove"|"undo";
    }>
  inboxQuery: UseQueryResult<IInboxItem[]>
  inboxItems: IInboxItem[]|undefined
}

export type PanelMode = 'normal' | 'select-project' | 'enqueue'

export interface IInboxItem {
  _id: string
  content: string
  project: { 
    name: string
    queue: 0|1|2|3|4|null
  }|null
  last_delay: null|{
    amount: InboxDelayAmounts, 
    delayed_at: Date, 
  },
  allowed_after: Date
}

export type InboxDelayAmounts = 'day'|'week'|'month'|'3months';

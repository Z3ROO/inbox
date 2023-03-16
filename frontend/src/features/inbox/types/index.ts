import { Mutation } from "@/lib/query"
import { UseQueryResult } from "react-query/types/react"

export interface IFilterPanelContext {
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


export interface IInboxItem {
  _id: string
  content: string
  last_delay: null|{
    amount: InboxDelayAmounts, 
    delayed_at: Date, 
  },
  allowed_after: Date
}

export type InboxDelayAmounts = 'day'|'week'|'month'|'3months';

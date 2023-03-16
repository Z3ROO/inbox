import { createContext, useContext, useState } from "react";
import { IFilterPanelContext } from "@/features/inbox/types";
import * as InboxAPI from '@/features/inbox/api'

const Context = createContext<IFilterPanelContext|null>(null);

export const useFilterPanelContext = () => useContext(Context);

export function FilterPanelContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  const inboxQuery = InboxAPI.QueryInboxItems();
  const inboxItems = inboxQuery.data;

  const [inboxFilterText, setInboxFilterText] = useState(''); 

  const updateInboxItem = InboxAPI.UpdateInboxItem();

  const contextValue: IFilterPanelContext = {
    isFilterPanelOpen, toggleFilterPanel,
    inboxFilterText, setInboxFilterText,
    inboxQuery, inboxItems,
    updateInboxItem
  }

  return (
    <Context.Provider value={contextValue}>
      { props.children }
    </Context.Provider>
  )
}

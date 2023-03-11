import { createContext, useContext, useState } from "react";
import { IFilterPanelContext, IInboxItem, PanelMode } from "@/features/inbox/types";
import * as InboxAPI from '@/features/inbox/api'

const Context = createContext<IFilterPanelContext|null>(null);

export const useFilterPanelContext = () => useContext(Context);

export function FilterPanelContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [panelMode, setPanelMode] = useState<PanelMode>('normal');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  const inboxQuery = InboxAPI.QueryInboxItems();
  const inboxItems = inboxQuery.data;

  const [inboxFilterText, setInboxFilterText] = useState(''); 

  const updateInboxItem = InboxAPI.UpdateInboxItem();

  const contextValue: IFilterPanelContext = {
    panelMode, setPanelMode,
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

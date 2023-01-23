import { createContext, useContext, useEffect, useState } from "react";
import { IFilterPanelContext, IInboxItem } from "@/features/inbox/types";

const Context = createContext<IFilterPanelContext|null>(null);

export const useFilterPanelContext = () => useContext(Context);

export function FilterPanelContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  const [inboxFilterText, setInboxFilterText] = useState('');
  const [filterInboxMode, setFilterInboxMode] = useState(false);  

  const [inboxItems, setInboxItems] = useState<IInboxItem[]>();

  async function getInboxItems() {
    const response: IInboxItem[] = [
      {
        content: 'teste teste teste \n teste teste', 
        last_delay: { 
          amount: 'month', 
          delayed_at: new Date(6546546545411), 
          allowed_after: new Date()
        } 
      }
    ];
    
    setInboxItems(response);
  }

  async function updateInboxItem(amount: 'day'|'week'|'month'|'year') {
    
  }

  async function removeInboxItem() {
    setInboxItems([])
  }

  async function undoInboxItemUpdate() {

  }

  useEffect(() => {
    if (inboxItems?.length)
      setInboxFilterText(inboxItems[0].content)
  }, [inboxItems]);

  const contextValue: IFilterPanelContext = {
    isFilterPanelOpen, toggleFilterPanel,
    inboxFilterText, setInboxFilterText,
    inboxItems,
    getInboxItems, updateInboxItem, undoInboxItemUpdate, removeInboxItem
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
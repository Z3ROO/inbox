import { createContext, useContext, useState } from "react";
import { IFilterPanelContext } from "@/features/inbox/types";

const Context = createContext<IFilterPanelContext|null>(null);

export const useFilterPanelContext = () => useContext(Context);

export function FilterPanelContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  const [inboxFilterTextarea, setInboxFilterTextarea] = useState(''); 

  const contextValue: IFilterPanelContext = {
    isFilterPanelOpen, toggleFilterPanel,
    inboxFilterTextarea, setInboxFilterTextarea,
  }

  return (
    <Context.Provider value={contextValue}>
      { props.children }
    </Context.Provider>
  )
}

import { createContext, useContext, useEffect, useState } from "react";
import { IFilterPanelContext, IInboxItem } from "@/features/inbox/types";

import * as InboxAPI from '@/features/inbox/api'
import { useQuery, QueryClient, QueryClientProvider, useMutation } from "react-query";
import { queryClient } from "@/App";

const Context = createContext<IFilterPanelContext|null>(null);

export const useFilterPanelContext = () => useContext(Context);

export function FilterPanelContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  const inboxItems = useQuery('inbox-items', InboxAPI.getInboxItems);

  const [inboxFilterText, setInboxFilterText] = useState(''); 

  const updateInboxItem = useMutation(InboxAPI.updateInboxItem, {
    onSuccess: (data, variables) => {
      const { action } = variables;

      if (action !== 'undo') {
        queryClient.setQueryData<IInboxItem[]>('inbox-items', (data) => (data||[]).slice(1));
      }
      else
        queryClient.invalidateQueries('inbox-items');
    }
  });

  const contextValue: IFilterPanelContext = {
    isFilterPanelOpen, toggleFilterPanel,
    inboxFilterText, setInboxFilterText,
    inboxItems,
    updateInboxItem
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
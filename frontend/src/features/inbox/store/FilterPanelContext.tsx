import { createContext, useContext, useEffect, useState } from "react";
import { IFilterPanelContext, IInboxItem, PanelMode } from "@/features/inbox/types";

import * as InboxAPI from '@/features/inbox/api'
import { useQuery, QueryClient, QueryClientProvider, useMutation } from "react-query";
import { queryClient } from "@/App";

const Context = createContext<IFilterPanelContext|null>(null);

export const useFilterPanelContext = () => useContext(Context);

export function FilterPanelContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [panelMode, setPanelMode] = useState<PanelMode>('normal');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => setIsFilterPanelOpen(prev => !prev);

  const inboxQuery = useQuery('inbox-items', InboxAPI.getInboxItems);

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
    panelMode, setPanelMode,
    isFilterPanelOpen, toggleFilterPanel,
    inboxFilterText, setInboxFilterText,
    inboxQuery, inboxItems: inboxQuery.data!,
    updateInboxItem
  }

  const content = () => {
    if (inboxQuery.isLoading)
      return <>Loading...</>
    if (inboxQuery.error)
      return <>Something Went wrong</>

    if (!inboxQuery.data || inboxQuery.data.length === 0)
      return (
        <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
      )

    return props.children
  }

  return (
    <Context.Provider value={contextValue}>
      {
        content()
      }
    </Context.Provider>
  )
}

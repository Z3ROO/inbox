import { createContext, useContext, useEffect, useState } from "react";
import { DraftItemsMethods, IInboxContext } from "@/features/inbox/types";
import { DraftItemDTO, IDraft } from "shared-types";
import * as InboxAPI from '@/features/inbox/api';
import { queryClient } from "@/App";

const Context = createContext<IInboxContext|null>(null);

export const useInboxContext = () => useContext(Context);

const draftTemplate: IDraft = {
  _id: '',
  title: '',
  content: '',
  subject: {
    _id: '',
    color: '',
    icon: '',
    name: ''
  },
  priority: 0,
  to_deal: false,
  delayed_at: undefined,
  delay: 'none',
  delay_quantity: 1,
  allowed_after: undefined,
  created_at: new Date(),
}

export function InboxContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [mode, setMode] = useState<'create'|'edit'|null>(null);
  
  const [draft, setDraft] = useState<IDraft>();

  const modeSetter = (mode: 'edit'|'create'|null) => {
    if (mode === 'edit') {

    }
    else if (mode === 'create') 
      setDraft(draftTemplate);
    
    setMode(mode)
  }

  const contextValue: IInboxContext = {
    mode, setMode: modeSetter,
    draft, setDraft
  }

  return (
    <Context.Provider value={contextValue}>
      { props.children }
    </Context.Provider>
  )
}

import { createContext, useContext, useEffect, useState } from "react";
import { DraftItemsMethods, IDraftEditorContext } from "@/features/inbox/types";
import { DraftItemDTO, IDraft } from "shared-types";
import * as InboxAPI from '@/features/inbox/api';

const Context = createContext<IDraftEditorContext|null>(null);

export const useDraftEditor = () => useContext(Context);

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

export function DraftEditorContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [mode, setMode] = useState<'create'|'edit'|null>(null);
  const inbox = InboxAPI.QueryInbox();
  const [draft, setDraft] = useState<IDraft>();

  const [draftItemsDTO, setDraftItemsDTO] = useState<DraftItemDTO[]>([]);

  const modeSetter = (mode: 'edit'|'create'|null) => {
    if (mode === 'edit') {
      if (inbox.data == null)
        return;
      const topDraft = inbox.data[0]
      setDraft(topDraft);
    }
    else if (mode === 'create') {
      setDraft(structuredClone(draftTemplate));
      setDraftItemsDTO([]);
    }
    
    setMode(mode)
  }

  //Updates topDraft
  useEffect(() => {
    if (mode === 'edit') {
      modeSetter('edit');
    }
  },[inbox.data]);

  const contextValue: IDraftEditorContext = {
    mode, setMode: modeSetter,
    draft, setDraft,
    draftItemsDTO, setDraftItemsDTO,
    inbox
  }

  return (
    <Context.Provider value={contextValue}>
      { props.children }
    </Context.Provider>
  )
}

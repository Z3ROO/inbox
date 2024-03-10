import { createContext, useContext, useState } from "react";
import { IInboxContext } from "@/features/inbox/types";

const Context = createContext<IInboxContext|null>(null);

export const useInboxContext = () => useContext(Context);

export function InboxContextProvider(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const [isInboxManagerOpen, setIsInboxManagerOpen] = useState(false);
  const toggleInboxManager = () => setIsInboxManagerOpen(prev => !prev);

  const [inboxManagerTitle, setInboxManagerTitle] = useState('');
  const [inboxManagerTextarea, setInboxManagerTextarea] = useState('');

  const contextValue: IInboxContext = {
    isInboxManagerOpen, toggleInboxManager,
    inboxManagerTitle, setInboxManagerTitle,
    inboxManagerTextarea, setInboxManagerTextarea,
  }

  return (
    <Context.Provider value={contextValue}>
      { props.children }
    </Context.Provider>
  )
}

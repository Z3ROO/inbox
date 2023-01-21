import React, { createContext, useContext, useState } from "react"

export interface InboxStateController {
  inboxInsertText: string
  setInboxInsertText: React.Dispatch<React.SetStateAction<string>>
  inboxFilterText: string
  setInboxFilterText: React.Dispatch<React.SetStateAction<string>>
  insertInbox: () => Promise<void>
  filterInboxMode: boolean
  toggleFilterInboxMode: () => void
}

const StateControllerContext = createContext<InboxStateController|null>(null);
export const useInboxState = () => useContext(StateControllerContext);

function StateController(): InboxStateController {
  const [inboxInsertText, setInboxInsertText] = useState('');

  async function insertInbox() {
    setInboxInsertText('');
    localStorage.setItem('inboxInsertText', '');
  }
  
  const [inboxFilterText, setInboxFilterText] = useState('');
  const [filterInboxMode, setFilterInboxMode] = useState(false);
  const toggleFilterInboxMode = () => setFilterInboxMode(prev => !prev);

  return {
    inboxInsertText, setInboxInsertText, 
    insertInbox,
    inboxFilterText, setInboxFilterText,
    filterInboxMode, toggleFilterInboxMode
  }
}


export function InboxStateScope(props: { children?: JSX.Element|null|false|(JSX.Element|null|undefined|false)[] }) {
  const controller = StateController();

  return (
    <StateControllerContext.Provider value={controller}>
      {props.children}
    </StateControllerContext.Provider>
  )
}
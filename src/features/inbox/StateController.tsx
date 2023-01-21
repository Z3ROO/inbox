import React, { createContext, useContext, useState } from "react"

export interface IInboxItem {
  content: string
  last_delay: null|{
    amount: DelayAmounts, 
    delayed_at: Date, 
    allowed_after: Date
  }
}

type DelayAmounts = 'day'|'week'|'month'|'year';

export interface InboxStateController {
  inboxInsertText: string
  setInboxInsertText: React.Dispatch<React.SetStateAction<string>>
  inboxFilterText: string
  setInboxFilterText: React.Dispatch<React.SetStateAction<string>>
  insertInbox: () => Promise<void>
  filterInboxMode: boolean
  toggleFilterInboxMode: () => void
  updateInboxItem: (amount: DelayAmounts) => Promise<void>
  undoInboxItemUpdate: () => Promise<void>
  inboxItems: IInboxItem[]|undefined
  getInboxItems: () => Promise<void>
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

  const [inboxItems, setInboxItems] = useState<IInboxItem[]>();

  async function updateInboxItem(amount: 'day'|'week'|'month'|'year') {
    
  }

  async function getInboxItems() {
    const response: IInboxItem[] = [{content: 'teste teste teste \n teste teste', last_delay: { amount: 'month', delayed_at: new Date(), allowed_after: new Date()} }]
    setInboxItems(response);
  }

  async function undoInboxItemUpdate() {

  }

  return {
    inboxInsertText, setInboxInsertText, 
    insertInbox,
    inboxFilterText, setInboxFilterText,
    filterInboxMode, toggleFilterInboxMode,
    inboxItems,
    getInboxItems, updateInboxItem, undoInboxItemUpdate
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
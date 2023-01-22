/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrashAlt, FaUndoAlt } from 'react-icons/fa'
import { useEffect } from "react";
import { InboxDelayAmounts, InboxStateScope, useInboxState } from "./StateController";
import { Modal } from "@/components/Modal";
import { BtnPrimary, BtnSecondary } from "@/components/Buttons";


export default function Inbox() {

  return (
    <InboxStateScope>
      <InboxPanel />
    </InboxStateScope>
  )
}

function InboxPanel() {
  return (
    <div>
      <h4 className="text-tanj-green">Inbox</h4>
      <div className="">
        <InboxPanelInputField />
        <InboxPanelControlls />
      </div>
      <FilterInboxModal />      
    </div>
  )
}

function InboxPanelInputField() {
  const {inboxInsertText, setInboxInsertText} = useInboxState()!;

  useEffect(() => {
    const cachedInsertText = localStorage.getItem('inboxInsertText');
    if (cachedInsertText?.length)
      setInboxInsertText(cachedInsertText);
  },[]);

  return (
    <textarea 
      value={inboxInsertText} onChange={e => { setInboxInsertText(e.target.value); localStorage.setItem('inboxInsertText', e.target.value) }}
      className={`
        resize-none bg-tanj-white rounded-sm w-72 h-36 p-2 
        shadow-inner shadow-[rgba(0,0,0,0.2)] 
        border-2 border-tanj-pink focus:border-tanj-green outline-none 
      `} 
    />
  )
}

function InboxPanelControlls() {
  const { insertInbox, toggleFilterInboxMode } = useInboxState()!;

  return (
    <div className="flex justify-between">
      <BtnPrimary
        onClick={insertInbox}
      >Add</BtnPrimary>
      <BtnPrimary
        onClick={toggleFilterInboxMode}
      >Free</BtnPrimary>
    </div>
  )
}

function FilterInboxModal() {
  const { toggleFilterInboxMode, filterInboxMode } = useInboxState()!;

  if (filterInboxMode)
    return (
      <Modal closeFn={toggleFilterInboxMode}>
        <FilterInbox />
      </Modal>
    )
  
  return null
}

function FilterInbox() {
  const { inboxItems, getInboxItems } = useInboxState()!;

  useEffect(() => {
    getInboxItems();
  },[])

  if (!inboxItems)
    return (  
      <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
    )

  if (inboxItems.length === 0)
    return (  
      <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
    ) 

  return (
    <div className="w-[28] m-2">
      <h4 className="text-tanj-green">Inbox filter:</h4>
      <InboxFilterInputField />
      <LastDelayDetails />
      <InboxFilterControlls />
    </div>
  )
}

function InboxFilterInputField() {
  const { inboxFilterText, setInboxFilterText} = useInboxState()!;

  return (
    <textarea 
      value={inboxFilterText} onChange={e => setInboxFilterText(e.target.value)}
      className={`
        resize-none bg-tanj-white rounded-sm w-full h-56 p-2 
        shadow-inner shadow-[rgba(0,0,0,0.2)] 
        border-2 border-tanj-pink focus:border-tanj-green outline-none 
      `} 
    />
  )
}

function LastDelayDetails() {
  const { inboxItems } = useInboxState()!;
  const delayed_at = (inboxItems || [])[0].last_delay?.delayed_at;

  return (
    <div className="text-right">
      <span className="text-sm text-tanj-green">
        {
          delayed_at ?
          `Delayed a year on ${new Date(delayed_at).toLocaleDateString(['pt-BR'])}.` :
          `Never delayed.`
        }
      </span>
    </div>
  )
}

function InboxFilterControlls() {
  const { updateInboxItem, removeInboxItem, undoInboxItemUpdate } = useInboxState()!;

  return (
    <div className="flex justify-between mt-2 text-sm">
      {
        ['Day', 'Week', 'Month', 'Year'].map(amount => (
          <BtnPrimary
            onClick={() => updateInboxItem(amount.toLowerCase() as InboxDelayAmounts)}
          >{amount}</BtnPrimary>    
        ))
      }
      <BtnSecondary icon bgLess onClick={removeInboxItem}>
        <FaTrashAlt/>
      </BtnSecondary>
      <BtnSecondary icon bgLess onClick={undoInboxItemUpdate}>
        <FaUndoAlt/>
      </BtnSecondary>
    </div>
  )
}
import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { Modal } from "@/components/Modal";
import { useEffect } from "react";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { InboxDelayAmounts } from "../types";

export function InboxFilterPanelModal() {
  const { isFilterPanelOpen, toggleFilterPanel } = useFilterPanelContext()!;

  if (isFilterPanelOpen)
    return (
      <Modal closeFn={toggleFilterPanel}>
        <FilterPanel />
      </Modal>
    )

  return null
}

function FilterPanel() {
  const { inboxItems, getInboxItems } = useFilterPanelContext()!;

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
      <InputField />
      <LastDelayLog />
      <Controlls />
    </div>
  )
}

function InputField() {
  const { inboxFilterText, setInboxFilterText} = useFilterPanelContext()!;

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

function LastDelayLog() {
  const { inboxItems } = useFilterPanelContext()!;
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

function Controlls() {
  const { updateInboxItem, removeInboxItem, undoInboxItemUpdate } = useFilterPanelContext()!;

  return (
    <div className="flex justify-between mt-2 text-sm">
      {
        ['Day', 'Week', 'Month', '3 Months'].map(amount => (
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
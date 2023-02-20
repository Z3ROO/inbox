import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { Modal } from "@/components/Modal";
import { useEffect } from "react";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { HiArrowDownOnSquareStack } from "react-icons/hi2";
import { useFilterPanelContext } from "@/features/inbox/store/FilterPanelContext";
import { InboxDelayAmounts, PanelMode } from "@/features/inbox/types";
import { BiLoaderAlt } from 'react-icons/bi';
import { Textarea } from "@/components/Forms";

export function InboxFilterPanelModal() {
  const { isFilterPanelOpen, toggleFilterPanel } = useFilterPanelContext()!;

  return (
    <Modal isModalOpen={isFilterPanelOpen} closeFn={toggleFilterPanel}>
      <FilterPanel />
    </Modal>
  )
}

function FilterPanel() {
  const { inboxItems, panelMode, setPanelMode } = useFilterPanelContext()!;

  if (inboxItems.isLoading)
    return (  
      <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
    )
  
  if (inboxItems.isError)
    return (  
      <h2 className="m-4 mx-10 text-tanj-green">Something went wrong.</h2>
    )

  if (!inboxItems.data || inboxItems.data.length === 0)
    return (  
      <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
    ) 

  return (
    <div className="w-[28] m-2">
      <div className="flex justify-between">
        <span className="text-tanj-green font-bold text-2xl">Inbox:</span>
        <BtnSecondary className="m-0" bgLess onClick={() => setPanelMode(prev => prev === 'select-project' ? 'normal' : 'select-project')}>
          <span>Choose a project</span>
        </BtnSecondary>
      </div>
      <div className="relative h-56">
        {
          panelMode === 'normal' ? <InputField /> : <SetOptionsField />
        }
      </div>
      <div className="flex justify-between">
        <BtnSecondary className="m-0 py-0" icon bgLess onClick={() => setPanelMode(prev => prev === 'enqueue' ? 'normal' : 'enqueue')}>
          <HiArrowDownOnSquareStack className="w-4 h-4"/>
        </BtnSecondary>
        <LastDelayLog />
      </div>
      <Controlls />
    </div>
  )
}

function InputField() {
  const { inboxItems, inboxFilterText, setInboxFilterText, updateInboxItem} = useFilterPanelContext()!;
  
  useEffect(() => {
    if (inboxItems.isSuccess) {
      setInboxFilterText(inboxItems.data[0].content);
    }
  }, [inboxItems.data]);


  return (
    <>
      <Textarea 
        className={`resize-none w-full h-full`} 
        value={inboxFilterText} onChange={e => setInboxFilterText(e.target.value)}
      />
      {
        updateInboxItem.isLoading &&
        <BiLoaderAlt className="absolute top-4 right-4 animate-spin" />
      }
    </>
    
  )
}

function SetOptionsField() {
  const { panelMode } = useFilterPanelContext()!;
  const content = SwitchSetters(panelMode);

  return (
    <div className="w-full h-full border-2 border-tanj-green rounded-sm bg-tanj-gray">
      { content }
    </div>
  ) 

}

function SwitchSetters(mode: PanelMode):JSX.Element|null {
  switch(mode) {
    case 'enqueue':
    return <></>
    
    default:
    return null
  }
}

function LastDelayLog() {
  const { inboxItems } = useFilterPanelContext()!;

  if (!inboxItems.data || inboxItems.data.length === 0)
    return null

  const { delayed_at, amount } = inboxItems.data[0].last_delay || {};

  return (
    <div className="text-right">
      <span className="text-sm text-tanj-green">
        {
          (delayed_at && amount) ?
          `Delayed for ${amount.includes('-') ? '' : 'a '}${amount.replace(/-/g, ' ')} on ${new Date(delayed_at).toLocaleDateString(['pt-BR'])}.` :
          `Never delayed.`
        }
      </span>
    </div>
  )
}

function Controlls() {
  const { inboxItems, updateInboxItem, inboxFilterText } = useFilterPanelContext()!
  const { mutate: updateItem, isLoading } = updateInboxItem;

  const currentItem = (inboxItems.data || [])[0];

  return (
    <div className="flex justify-between mt-2 text-sm">
      {
        ['Day', 'Week', 'Month', '3 Months'].map(amount => (
          <BtnPrimary
            onClick={() => updateItem({ content: inboxFilterText , inboxItem_id: currentItem._id, action: amount.toLowerCase().replace(/ /g, '-') as InboxDelayAmounts })} 
            disabled={isLoading}
          >{amount}</BtnPrimary>
        ))
      }
      <BtnSecondary icon bgLess 
        disabled={isLoading}
        onClick={() => updateItem({ inboxItem_id: currentItem._id, action: 'remove' })}
      >
        <FaTrashAlt/>
      </BtnSecondary>
      <BtnSecondary icon bgLess 
        disabled={isLoading}
        onClick={() => updateItem({ inboxItem_id: currentItem._id, action: 'undo' })}
      >
        <FaUndoAlt/>
      </BtnSecondary>
    </div>
  )
}

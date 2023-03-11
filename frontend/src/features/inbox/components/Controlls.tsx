import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { InboxDelayAmounts } from "../types";

export function Controlls() {
  return (
    <div className="flex justify-between mt-2 text-sm">
      <DelayItemButtons />
      <RemoveButton />
      <UndoButton />
    </div>
  )
}

function DelayItemButtons() {
  const { inboxItems, updateInboxItem, inboxFilterText } = useFilterPanelContext()!
  const { mutate: updateItem, isLoading } = updateInboxItem;

  const currentItem = inboxItems[0];

  const updateItemEvent = (amount: string) => () => { 
    updateItem({ 
      content: inboxFilterText, 
      inboxItem_id: currentItem._id, 
      action: amount.toLowerCase().replace(/ /g, '-') as InboxDelayAmounts 
    });
  }

  return (
    <>
      {
        ['Day', 'Week', 'Month', '3 Months'].map(amount => (
          <BtnPrimary
            onClick={updateItemEvent(amount)}
            disabled={isLoading}
          >{amount}</BtnPrimary>
        ))
      }
    </>
  )
}

function RemoveButton() {
  const { inboxItems, updateInboxItem } = useFilterPanelContext()!
  const { mutate: updateItem, isLoading } = updateInboxItem;

  const currentItem = inboxItems[0];

  return (
    <BtnSecondary icon bgLess
      disabled={isLoading}
      onClick={() => updateItem({ inboxItem_id: currentItem._id, action: 'remove' })}
    >
      <FaTrashAlt />
    </BtnSecondary>
  )
}

function UndoButton() {
  const { inboxItems, updateInboxItem } = useFilterPanelContext()!
  const { mutate: updateItem, isLoading } = updateInboxItem;

  const currentItem = inboxItems[0];

  return (
    <BtnSecondary icon bgLess
      disabled={isLoading}
      onClick={() => updateItem({ inboxItem_id: currentItem._id, action: 'undo' })}
    >
      <FaUndoAlt />
    </BtnSecondary>
  )
}

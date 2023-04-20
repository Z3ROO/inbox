import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { InboxDelayAmounts } from "../types";
import { BsFillCheckSquareFill } from "react-icons/bs";

export function Controlls() {
  return (
    <div className="flex justify-between mt-2 text-sm">
      <DelayItemButtons />
      <TodoButton />
      <RemoveButton />
      <UndoButton />
    </div>
  )
}

function DelayItemButtons() {
  const { inboxItems, updateInboxItem, inboxFilterText } = useFilterPanelContext()!

  const currentItem = inboxItems![0];

  const updateItemEvent = (amount: string) => () => { 
    updateInboxItem({ 
      content: inboxFilterText, 
      inboxItem_id: currentItem._id, 
      action: amount.toLowerCase().replace(/ /g, '-') as InboxDelayAmounts 
    });
  }

  return (
    <>
      {
        ['Next', 'Day', 'Week', 'Month', '3 Months'].map(amount => (
          <BtnPrimary
            onClick={updateItemEvent(amount)}
            disabled={updateInboxItem.isLoading}
          >{amount}</BtnPrimary>
        ))
      }
    </>
  )
}

function TodoButton() {
  const { inboxItems, updateInboxItem } = useFilterPanelContext()!

  const currentItem = inboxItems![0];

  return (
    <BtnSecondary icon bgLess
      disabled={updateInboxItem.isLoading}
      onClick={() => updateInboxItem({ inboxItem_id: currentItem._id, action: 'remove' })}
    >
      <BsFillCheckSquareFill />
    </BtnSecondary>
  )
}


function RemoveButton() {
  const { inboxItems, updateInboxItem } = useFilterPanelContext()!

  const currentItem = inboxItems![0];

  return (
    <BtnSecondary icon bgLess
      disabled={updateInboxItem.isLoading}
      onClick={() => updateInboxItem({ inboxItem_id: currentItem._id, action: 'remove' })}
    >
      <FaTrashAlt />
    </BtnSecondary>
  )
}

function UndoButton() {
  const { inboxItems, updateInboxItem } = useFilterPanelContext()!

  const currentItem = inboxItems![0];

  return (
    <BtnSecondary icon bgLess
      disabled={updateInboxItem.isLoading}
      onClick={() => updateInboxItem({ inboxItem_id: currentItem._id, action: 'undo' })}
    >
      <FaUndoAlt />
    </BtnSecondary>
  )
}

function RoutineOptionsItem(props: { action: () => void, confirm?: boolean, children: JSX.Element}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { action, confirm, children } = props;

  return (
    <div className='relative'>
      <BtnSecondary icon 
        className=''
        onClick={e => {
          if (confirm) {
            setIsConfirmOpen(prev => !prev);
            return;
          }
          action();
        }}
      >
        {children}
      </BtnSecondary>
      { 
        isConfirmOpen && ( 
          <ConfirmationWidget 
            className='absolute top-0.5 left-[calc(100%+.5rem)]'
            y={() => { action(); setIsConfirmOpen(false); }} 
            n={() => setIsConfirmOpen(false)} 
          /> 
        )
      }
    </div>
  )
}


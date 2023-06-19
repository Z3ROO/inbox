import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { InboxDelayAmounts } from "../types";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import * as InboxAPI from '@/features/inbox/api';

export function Controlls() {
  return (
    <div className="flex justify-between mt-2 text-sm">
      <DelayItemButtons />
      <TodoButton />
      <RemoveButton />
      <UndoButton />
    </div>
  );
}

function DelayItemButtons() {
  const { inboxFilterTextarea } = useFilterPanelContext()!
  const inboxItems = InboxAPI.QueryInboxItems().data;
  const currentItem = inboxItems![0];

  const updateInboxItem = InboxAPI.UpdateInboxItem();

  const updateItemEvent = (amount: InboxDelayAmounts) => () => { 
    updateInboxItem({ 
      content: inboxFilterTextarea, 
      inboxItem_id: currentItem._id, 
      action: amount 
    });
  }

  return (
    <>
      {
        ['Next', 'Day', 'Week', 'Month', '3 Months'].map(amount => (
          <BtnPrimary
            onClick={updateItemEvent(amount.toLowerCase().replace(/ /g, '-') as InboxDelayAmounts)}
            disabled={updateInboxItem.isLoading}
          >{amount}</BtnPrimary>
        ))
      }
    </>
  );
}

function DropDownOnHoldButton() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  return (
    <button
      onMouseDown={
        (event) => {
          if (event.button !== 0)
            return; 
          timeout.current = setTimeout(()=>{
            setIsDropDownOpen(true);
          }, 1000);
        }
      }
      onMouseUp={
        (event) => {
          if (event.button !== 0)
            return; 
         
          clearTimeout(timeout.current)
        }
      }

      style={{
        width: isDropDownOpen ? "50px" : "50px",
        height: isDropDownOpen ? "140px" : "35px",
        //width: isDropDownOpen ? "" : "",
      }}
      className="bg-red-300 rounded p-2"
    >
      Teste test
    </button>
  );
}

function TodoButton() {
  const inboxItems = InboxAPI.QueryInboxItems().data;
  const currentItem = inboxItems![0];

  const toggleTodo = InboxAPI.ToggleInboxTodo();

  return (
    <OptionBtn confirm
      disabled={toggleTodo.isLoading}
      onClick={() => toggleTodo({ inboxItem_id: currentItem._id, state: true })}
    >
      <BsFillCheckSquareFill />
    </OptionBtn>
  );
}


function RemoveButton() {
  const inboxItems = InboxAPI.QueryInboxItems().data;
  const currentItem = inboxItems![0];

  const updateInboxItem = InboxAPI.UpdateInboxItem();

  return (
    <OptionBtn confirm
      disabled={updateInboxItem.isLoading}
      onClick={() => updateInboxItem({ inboxItem_id: currentItem._id, action: 'remove' })}
    >
      <FaTrashAlt />
    </OptionBtn>
  );
}

function UndoButton() {
  const inboxItems = InboxAPI.QueryInboxItems().data;
  const currentItem = inboxItems![0];

  const updateInboxItem = InboxAPI.UpdateInboxItem();

  return (
    <OptionBtn
      disabled={updateInboxItem.isLoading}
      onClick={() => updateInboxItem({ inboxItem_id: currentItem._id, action: 'undo' })}
    >
      <FaUndoAlt />
    </OptionBtn>
  );
}

function OptionBtn(props: { onClick: () => void, disabled?: boolean, confirm?: boolean, children: JSX.Element}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { onClick, disabled, confirm, children } = props;

  return (
    <div className='relative'>
      <BtnSecondary icon 
        className=''
        onClick={e => {
          if (confirm) {
            setIsConfirmOpen(prev => !prev);
            return;
          }
          onClick();
        }}
        disabled={disabled}
      >
        {children}
      </BtnSecondary>
      { 
        isConfirmOpen && ( 
          <ConfirmationWidget 
            className='absolute bottom-14 left-[calc(50%)] translate-x-[-50%]'
            y={() => { onClick(); setIsConfirmOpen(false); }} 
            n={() => setIsConfirmOpen(false)} 
          /> 
        )
      }
    </div>
  );
}

function ConfirmationWidget({y, n, className}: { y: () => void, n: () => void, className?: string}) {

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      n(); 
    }
    const delay = setTimeout( () => window.addEventListener('click', handler), 0);

    return () => {
      clearTimeout(delay);
      window.removeEventListener('click', handler);
    }
  }, []);

  return (
    <div onClick={e => e.stopPropagation()} 
      style={{
        backdropFilter: 'blur(8px)'
      }}
      className={`flex rounded-sm bg-tanj-brown bg-opacity-70 shadow ${className}`}>
      <BtnSecondary icon onClick={n}>
        <ImCross className='w-2.5 h-2.5 text-tanj-pink' />
      </BtnSecondary>
      <BtnSecondary icon onClick={y}>
        <FaCheck className='w-2.5 h-2.5 text-tanj-green' />
      </BtnSecondary>
    </div>
  );
}

import { BtnPrimary, BtnSecondary, DropDownOnHoldButton } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useFilterPanelContext } from "../../store/FilterPanelContext";
import { DraftDelayAmounts } from "../../types";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import * as InboxAPI from '@/features/inbox/api';

export function Controlls() {
  return (
    <div className="flex justify-between mt-2 text-sm">
      <DelayDraftButtons />
      <TodoButton />
      <RemoveButton />
      <UndoButton />
    </div>
  );
}

function DelayDraftButtons() {
  const { inboxFilterTextarea } = useFilterPanelContext()!
  const inbox = InboxAPI.QueryInbox().data;
  const currentDraft = inbox![0];

  const updateDraft = InboxAPI.UpdateDraft();

  const updateDraftEvent = (delay: DraftDelayAmounts, quantity?: 1|2|3) => () => { 
    updateDraft({ 
      content: inboxFilterTextarea, 
      draft_id: currentDraft._id, 
      action: delay,
      quantity
    });
  }
  
  return (
    <>
      <DropDownOnHoldButton 
        buttons={[
          {
            children: 'Next',
            onClick: updateDraftEvent('next'),
            disabled: updateDraft.isLoading
          },
          {
            children: `Later`,
            onClick: updateDraftEvent('later'),
          },
          {
            children: `Dawn`,
            onClick: updateDraftEvent('dawn'),
            disabled: new Date().getHours() > 17
          }
        ]}
      />
      {
        ['Day', 'Week', 'Month'].map(amount => (
          <DropDownOnHoldButton 
            buttons={[
              { 
                children: amount, 
                onClick: updateDraftEvent(amount.toLowerCase() as DraftDelayAmounts),
                disabled: updateDraft.isLoading
              },
              {
                children: `2 ${amount}s`,
                onClick: updateDraftEvent(amount.toLowerCase() as DraftDelayAmounts, 2),
              },
              {
                children: `3 ${amount}s`,
                onClick: updateDraftEvent(amount.toLowerCase() as DraftDelayAmounts, 3),

              }
            ]}
          />
        ))
      }
    </>
  );
}

function TodoButton() {
  const { inboxFilterTextarea } = useFilterPanelContext()!;
  const inbox = InboxAPI.QueryInbox().data;
  const currentDraft = inbox![0];

  const updateDraft = InboxAPI.UpdateDraft();
  const toggleTodo = InboxAPI.ToggleInboxTodo();

  return (
    <OptionBtn confirm
      disabled={toggleTodo.isLoading}
      onClick={() => {
        updateDraft({
          action: 'none',
          draft_id: currentDraft._id,
          content: inboxFilterTextarea
        })
        toggleTodo({ draft_id: currentDraft._id, state: true })
      }}
    >
      <BsFillCheckSquareFill />
    </OptionBtn>
  );
}


function RemoveButton() {
  const inbox = InboxAPI.QueryInbox().data;
  const currentDraft = inbox![0];

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <OptionBtn confirm
      disabled={updateDraft.isLoading}
      onClick={() => updateDraft({ draft_id: currentDraft._id, action: 'remove' })}
    >
      <FaTrashAlt />
    </OptionBtn>
  );
}

function UndoButton() {
  const inbox = InboxAPI.QueryInbox().data;
  const currentDraft = inbox![0];

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <OptionBtn
      disabled={updateDraft.isLoading}
      onClick={() => updateDraft({ draft_id: currentDraft._id, action: 'undo' })}
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

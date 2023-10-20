import { BtnSecondary, DropDownOnHoldButton, OptionBtn } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useInboxContext } from "../../store/InboxContext";
import { DraftDelayAmounts } from "../../types";
import { BsFillCheckSquareFill } from "react-icons/bs";


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
  const { inboxManagerTextarea } = useInboxContext()!
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const updateDraft = InboxAPI.UpdateDraft();

  const updateDraftEvent = (delay: DraftDelayAmounts, quantity?: 1|2|3) => () => { 
    updateDraft({ 
      content: inboxManagerTextarea, 
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
  const { inboxManagerTextarea } = useInboxContext()!;
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const updateDraft = InboxAPI.UpdateDraft();
  const toggleTodo = InboxAPI.ToggleInboxTodo();

  return (
    <div>
      <BtnSecondary icon
        className=""
        disabled={toggleTodo.isLoading}
        onClick={() => {
          updateDraft({
            action: 'none',
            draft_id: currentDraft._id,
            content: inboxManagerTextarea
          });
          toggleTodo({ draft_id: currentDraft._id, state: true });
        }}
      >
        <BsFillCheckSquareFill />
      </BtnSecondary>
    </div>
  );
}


function RemoveButton() {
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

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
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

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

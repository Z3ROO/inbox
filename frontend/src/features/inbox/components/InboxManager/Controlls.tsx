import { Secondary, DropDownOnHoldButton, OptionBtn } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useInboxContext } from "../../store/InboxContext";
import { DraftDelayAmount } from "shared-types";
import { BsFillCheckSquareFill } from "react-icons/bs";
import * as InboxAPI from '@/features/inbox/api';
import * as ToDealAPI from '@/features/toDeal/api';

export function Controlls() {
  return (
    <div className="flex justify-between mt-2 text-sm">
      <DelayDraftButtons />
      <ToDealButton />
      <RemoveButton />
      <ToTaskButton />
      <UndoButton />
    </div>
  );
}

function DelayDraftButtons() {
  const { inboxManagerTextarea, inboxManagerTitle } = useInboxContext()!
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const updateDraft = InboxAPI.UpdateDraft();

  const updateDraftEvent = (delay: DraftDelayAmount, quantity?: 1|2|3) => () => { 
    updateDraft({ 
      title: inboxManagerTitle,
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
                onClick: updateDraftEvent(amount.toLowerCase() as DraftDelayAmount),
                disabled: updateDraft.isLoading
              },
              {
                children: `2 ${amount}s`,
                onClick: updateDraftEvent(amount.toLowerCase() as DraftDelayAmount, 2),
              },
              {
                children: `3 ${amount}s`,
                onClick: updateDraftEvent(amount.toLowerCase() as DraftDelayAmount, 3),

              }
            ]}
          />
        ))
      }
    </>
  );
}

function ToDealButton() {
  const { inboxManagerTextarea, inboxManagerTitle } = useInboxContext()!;
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const updateDraft = InboxAPI.UpdateDraft();
  const toggleToDeal = ToDealAPI.ToggleToDeal();

  return (
    <div>
      <Secondary icon
        className=""
        disabled={toggleToDeal.isLoading}
        onClick={() => {
          updateDraft({
            action: 'none',
            draft_id: currentDraft._id,
            title: inboxManagerTitle,
            content: inboxManagerTextarea
          });
          toggleToDeal({ draft_id: currentDraft._id, state: true });
        }}
      >
        <BsFillCheckSquareFill />
      </Secondary>
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

function ToTaskButton() {
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const toTask = InboxAPI.TransformInTask();

  return (
    <OptionBtn confirm
      disabled={toTask.isLoading}
      onClick={() => toTask({ draft_id: currentDraft._id })}
    >
      T
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

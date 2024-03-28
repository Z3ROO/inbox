import { Button, ConfirmButton } from "@/components/Buttons";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { useInboxContext } from "../../store/InboxContext";
import { DraftDelayAmount } from "shared-types";
import { BsFillCheckSquareFill } from "react-icons/bs";
import * as InboxAPI from '@/features/inbox/api';
import * as ToDealAPI from '@/features/toDeal/api';
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnHover } from "@/components/dropdown";

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
      <DropDownMenu>
        <DropDownMenuTriggerOnHover>Soon</DropDownMenuTriggerOnHover>
        <DropDownMenuContent position="top">
          <DropDownMenuItem onClick={updateDraftEvent('next')}>
            Next
          </DropDownMenuItem> 
          <DropDownMenuItem onClick={updateDraftEvent('later')}>
            Later
          </DropDownMenuItem> 
          <DropDownMenuItem onClick={updateDraftEvent('dawn')} disabled={new Date().getHours() > 17}>
            Dawn
          </DropDownMenuItem> 
        </DropDownMenuContent>
      </DropDownMenu>
      {
      ['Day', 'Week', 'Month'].map(amount => (
        <DropDownMenu>
          <DropDownMenuTriggerOnHover>{amount}</DropDownMenuTriggerOnHover>
          <DropDownMenuContent position="top">
            <DropDownMenuItem onClick={updateDraftEvent(amount.toLowerCase() as DraftDelayAmount)}>
              1 {amount}
            </DropDownMenuItem> 
            <DropDownMenuItem onClick={updateDraftEvent(amount.toLowerCase() as DraftDelayAmount, 2)}>
              2 {amount}s
            </DropDownMenuItem> 
            <DropDownMenuItem onClick={updateDraftEvent(amount.toLowerCase() as DraftDelayAmount, 3)}>
              3 {amount}s
            </DropDownMenuItem> 
          </DropDownMenuContent>
        </DropDownMenu>
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
      <Button icon
        variant="discret"
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
        <BsFillCheckSquareFill className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

function RemoveButton() {
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <ConfirmButton
      variant="discret" icon
      disabled={updateDraft.isLoading}
      onClick={() => updateDraft({ draft_id: currentDraft._id, action: 'remove' })}
    >
      <FaTrashAlt className="w-3.5 h-3.5" />
    </ConfirmButton>
  );
}

function ToTaskButton() {
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const toTask = InboxAPI.TransformInTask();

  return (
    <ConfirmButton
      variant="discret" icon
      disabled={toTask.isLoading}
      onClick={() => toTask({ draft_id: currentDraft._id })}
    >
      T
    </ConfirmButton>
  );
}

function UndoButton() {
  const inbox = InboxAPI.QueryInbox().data!;
  const currentDraft = inbox[0];

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <Button
      variant="discret" icon
      disabled={updateDraft.isLoading}
      onClick={() => updateDraft({ draft_id: currentDraft._id, action: 'undo' })}
    >
      <FaUndoAlt className="w-3.5 h-3.5" />
    </Button>
  );
}

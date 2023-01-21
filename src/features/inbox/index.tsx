import { InboxStateScope, useInboxState } from "./StateController";
import Modal from "../../components/Modal";
import { BtnPrimary } from "../../components/Buttons";


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

  return (
    <textarea 
      value={inboxInsertText} onChange={e => setInboxInsertText(e.target.value)}
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

  return (
    <Modal closeFn={toggleFilterInboxMode}>
      {
        filterInboxMode && (
          <FilterInbox />
        )
      }
    </Modal>
  )
}

function FilterInbox() {
  return (
    <div className="w-96 h-96"></div>
  )
}
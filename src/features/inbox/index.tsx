import { InboxStateScope, useInboxState } from "./StateController";
import Modal from "../../components/Modal";
import { BtnPrimary, BtnSecondary } from "../../components/Buttons";
import { FaTrashAlt } from 'react-icons/fa'


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
    <div className="w-96 m-2">
      <h4 className="text-tanj-green">Inbox filter:</h4>
      <InboxFilterInputField />
      <InboxFilterControlls />
    </div>
  )
}

function InboxFilterInputField() {
  const {inboxFilterText, setInboxFilterText} = useInboxState()!;

  return (
    <textarea 
      value={inboxFilterText} onChange={e => setInboxFilterText(e.target.value)}
      className={`
        resize-none bg-tanj-white rounded-sm w-full h-52 p-2 
        shadow-inner shadow-[rgba(0,0,0,0.2)] 
        border-2 border-tanj-pink focus:border-tanj-green outline-none
      `} 
    />
  )
}

function InboxFilterControlls() {
  const {  } = useInboxState()!;

  return (
    <div className="flex justify-between mt-2 text-sm">
      <BtnPrimary>Day</BtnPrimary>
      <BtnPrimary>Week</BtnPrimary>
      <BtnPrimary>Month</BtnPrimary>
      <BtnPrimary>Year</BtnPrimary>
      <BtnSecondary icon bgLess>
        <FaTrashAlt/>
      </BtnSecondary>
    </div>
  )
}
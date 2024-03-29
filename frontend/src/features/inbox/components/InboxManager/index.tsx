import { Modal } from "@/components/Modal";
import { useInboxContext } from "@/features/inbox/store/InboxContext";
import { StatusLog } from "./StatusLog";
import { DraftEditor } from "./DraftEditor";
import { Controlls } from "./Controlls";
import * as InboxAPI from '@/features/inbox/api';
import { InfoTags } from "./InfoTags";

export function InboxManagerModal() {
  const { isInboxManagerOpen, toggleInboxManager } = useInboxContext()!;

  return (
    <Modal isModalOpen={isInboxManagerOpen} closeFn={toggleInboxManager}>
      <Manager />
    </Modal>
  )
}

function Manager() {
  const inboxQuery = InboxAPI.QueryInbox();
  
/*
* All the proceding use of inboxItems depends on these conditions
* */
  if (inboxQuery.isLoading)
    return <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
  if (inboxQuery.error)
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong</h2>
  // ?? check if is idle ??
  if (!inboxQuery.data || inboxQuery.data.length === 0)
    return (
      <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
    )

  return (
    <div className="w-[36rem] m-2">
      <span className="text-tanj-green font-medium text-3xl">Inbox:</span>
      <InfoTags />
      <DraftEditor />
      <StatusLog />
      <Controlls />
    </div>
  )
}

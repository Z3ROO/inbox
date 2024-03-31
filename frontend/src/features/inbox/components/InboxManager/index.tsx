import { Modal } from "@/components/Modal";
import { useInboxContext } from "@/features/inbox/store/InboxContext";
import { StatusLog } from "./StatusLog";
import { DraftEditor } from "./DraftEditor";
import { Controlls } from "./Controlls";
import * as InboxAPI from '@/features/inbox/api';
import { InfoTags } from "./InfoTags";
import { useEffect } from "react";

export function InboxManagerModal() {
  const { mode, setMode } = useInboxContext()!;

  return (
    <Modal isModalOpen={mode != null} closeFn={() => setMode(null)}>
      <Manager />
    </Modal>
  )
}

function Manager() {
  const inbox = InboxAPI.QueryInbox();
  const { draft, setDraft } = useInboxContext()!;

  useEffect(() => {
    if (inbox.data == null)
      return;
    const currentDraft = inbox.data[0]
    setDraft(currentDraft);
  },[inbox.data]);
  
  if (draft == null)
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong. new</h2>
/*
* All the proceding use of inboxItems depends on these conditions
* */
  if (inbox.isLoading)
    return <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
  if (inbox.error)
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong</h2>
  // ?? check if is idle ??
  if (!inbox.data || inbox.data.length === 0)
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

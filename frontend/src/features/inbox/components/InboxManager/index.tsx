import { Modal } from "@/components/Modal";
import { useDraftEditor } from "@/features/inbox/store/DraftEditorContext";
import { StatusLog } from "./StatusLog";
import { DraftContent } from "./DraftContent";
import { Controlls } from "./Controlls";
import { InfoTags } from "./InfoTags";

export function DraftEditorModal() {
  const { mode, setMode } = useDraftEditor()!;

  return (
    <Modal isModalOpen={mode != null} closeFn={() => setMode(null)}>
      <DraftEditor />
    </Modal>
  )
}

function DraftEditor() {
  
  const { inbox, draft, mode} = useDraftEditor()!;
  
  if (draft == null && mode === 'create')
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong. new</h2>
/*
* All the proceding use of inboxItems depends on these conditions
* */
  if (inbox.isLoading)
    return <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
  if (inbox.error)
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong</h2>
  // ?? check if is idle ??
  if (mode === 'edit' && (!inbox.data || inbox.data.length === 0))
    return (
      <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
    )

  return (
    <div className="w-[36rem] m-2">
      <span className="text-tanj-green font-medium text-3xl">Inbox:</span>
      <InfoTags />
      <DraftContent />
      { mode === 'edit' && <StatusLog /> }
      <Controlls />
    </div>
  )
}

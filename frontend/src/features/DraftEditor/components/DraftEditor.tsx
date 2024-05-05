import { useDraftEditor } from "../store/DraftEditorContext";
import { Controlls } from "./Controlls";
import { DraftContent } from "./DraftContent";
import { Priority } from "./Priority";
import { TopBar } from "./TopBar";
import { StatusLog } from "./StatusLog";
import { Modal } from "@z3ro/nano";

export function DraftEditor() {
  const { mode, setMode } = useDraftEditor()!;

  return (
    <Modal isModalOpen={mode != null} closeFn={() => setMode(null)}>
      <DraftEditorConstructor />
    </Modal>
  )
}

function DraftEditorConstructor() {
  
  const { inbox, draft, mode } = useDraftEditor();
  
  if (draft == null && mode === 'create')
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong. new</h2>

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
    <div className="w-[40rem] my-2 ml-9">
      <span className="text-tanj-green font-medium text-3xl">
      {
        mode === 'edit' ? 
        'Inbox: ' :
        'New draft: '
      }
      </span>
      <TopBar />
      <div className="flex">
        <div className="flex-grow">
          <DraftContent />
          { mode === 'edit' && <StatusLog /> }
          <Controlls />
        </div>
        <div>
          <Priority />
        </div>
      </div>
    </div>
  )
}

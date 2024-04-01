/* eslint-disable react-hooks/exhaustive-deps */
import { DraftEditorContextProvider, useDraftEditor } from "./store/DraftEditorContext";
import { DraftEditorModal } from './components/InboxManager';
import { Button } from "@/components/Buttons";
import { createPortal } from "react-dom";

export default function Inbox() {
  return (
    <div className="mt-8">
      <DraftEditorContextProvider>
        <div className="w-96">{/* TA AQUI SO PRA CRIAR ESPAÇO NA TELA */}</div>
        <InitDraftEditor />
        <DraftEditorModal />
      </DraftEditorContextProvider>
    </div>
  )
}

function InitDraftEditor() {
  const draftEditorContext = useDraftEditor();

  if (!draftEditorContext)
    return null;

  return (
    createPortal(
    <div className="absolute top-8 left-1/2 -translate-x-1/2 p-2.5 rounded-sm bg-gray-600 z-50">
      <Button variant="discret" onClick={() => draftEditorContext.setMode('create')}>add</Button>
      <Button variant="discret" onClick={() => draftEditorContext.setMode('edit')}>edit</Button>
    </div>,
    document.body
    )
  );
}
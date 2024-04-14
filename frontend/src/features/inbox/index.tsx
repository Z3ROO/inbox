/* eslint-disable react-hooks/exhaustive-deps */
import { DraftEditorContextProvider, useDraftEditor } from "./store/DraftEditorContext";
import { DraftEditorModal } from './components/DraftEditorModal';
import { InitDraftEditor } from "./components/InitDraftEditor";

export function Inbox() {
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

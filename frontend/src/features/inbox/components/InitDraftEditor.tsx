import { Button } from "@/components/Buttons";
import { createPortal } from "react-dom";
import { useDraftEditor } from "../store/DraftEditorContext";
import * as Icon from '@/components/icons/UI';

export function InitDraftEditor() {
  const draftEditorContext = useDraftEditor();

  return (
    createPortal(
    <div className="absolute top-8 left-1/2 -translate-x-1/2 p-2.5 rounded-sm bg-gray-600 z-50">
      <Button variant="discret" icon onClick={() => draftEditorContext.setMode('create')}>
        <Icon.Util.plus />
      </Button>
      <Button variant="discret" icon onClick={() => draftEditorContext.setMode('edit')}>
        <Icon.Inbox.out />
      </Button>
    </div>,
    document.body
    )
  );
}
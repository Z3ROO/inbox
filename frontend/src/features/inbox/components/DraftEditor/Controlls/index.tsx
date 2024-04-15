import { useDraftEditor } from "@/features/inbox/store/DraftEditorContext";
import { CreatorControlls } from "./CreateModeControlls";
import { EditorControlls } from "./EditModeControlls";

export function Controlls() {
  const { mode } = useDraftEditor();
  return (
    <div className="flex justify-between mt-2 text-sm">
      {mode === 'create' && <CreatorControlls />}
      {mode === 'edit' && <EditorControlls />}
    </div>
  );
}

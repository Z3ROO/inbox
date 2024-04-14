import { Modal } from "@/components/Modal";
import { useDraftEditor } from "@/features/inbox/store/DraftEditorContext";
import { DraftEditor } from "./DraftEditor";

export function DraftEditorModal() {
  const { mode, setMode } = useDraftEditor()!;

  return (
    <Modal isModalOpen={mode != null} closeFn={() => setMode(null)}>
      <DraftEditor />
    </Modal>
  )
}

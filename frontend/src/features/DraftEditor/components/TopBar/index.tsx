import { useDraftEditor } from "@/features/DraftEditor/store/DraftEditorContext";
import timePassedSince from "@/features/DraftEditor/util/timePassedSince";
import { Subject } from "./Subject";
import { TimePassed } from "./TimePassed";

export function TopBar() {
  const { draft, mode } = useDraftEditor();

  const timePassed = timePassedSince(draft!.created_at);

  return (
    <div className="flex py-2 gap-2">
      <Subject />
      { mode === 'edit' && <TimePassed {...timePassed} />}
    </div>
  )
}
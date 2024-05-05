import { Button } from "@z3ro/nano";
import { Priority as PriorityIcons } from "@z3ro/nano";
import * as DraftEditor from '@/features/DraftEditor/api';
import { useDraftEditor } from "../store/DraftEditorContext";


export function Priority() {
  const { draft, setDraft, mode } = useDraftEditor();

  const updateDraft = DraftEditor.UpdateDraft();

  return (
    <PrioritySetter 
      cb={(priority) => {
        if (mode === 'create')
          setDraft(prev => ({...prev!, priority}));
        else if (mode === 'edit')
          updateDraft({draft_id: draft!._id, action: 'organization', priority, content: draft!.content, title: draft!.title})    
      }} 
    />
  )
}

function PrioritySetter({cb}: {cb: (priority: number) => void}) {
  const { draft } = useDraftEditor();

  return (
    <div className="flex flex-col gap-2 pl-2">
      <Button variant="discret" style={{
        filter: draft?.priority === 3 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 3 ? '1' : '.6',
        backgroundColor: draft?.priority === 3 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(3)} title="Urgent">
        <PriorityIcons.urgent className="w-5 h-5 text-red-400" />
      </Button>
      <Button variant="discret"  style={{
        filter: draft?.priority === 2 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 2 ? '1' : '.6',
        backgroundColor: draft?.priority === 2 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(2)} title="Important">
        <PriorityIcons.important className="w-5 h-5 text-orange-500" />
      </Button>
      <Button variant="discret"  style={{
        filter: draft?.priority === 1 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 1 ? '1' : '.6',
        backgroundColor: draft?.priority === 1 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(1)} title="Necessary">
        <PriorityIcons.necessary className="w-5 h-5 text-green-400" />
      </Button>
      <Button variant="discret"  style={{
        filter: draft?.priority === 0 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 0 ? '1' : '.6',
        backgroundColor: draft?.priority === 0 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(0)} title="None">
        <PriorityIcons.none className="w-5 h-5 text-gray-350" />
      </Button>
    </div>
  )
}

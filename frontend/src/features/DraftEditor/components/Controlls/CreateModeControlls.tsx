import { Button } from "@z3ro/nano";
import { useDraftEditor } from "@/features/DraftEditor/store/DraftEditorContext";
import * as DraftEditorAPI from '@/features/DraftEditor/api';

export function CreatorControlls() {
  const insertDraft = DraftEditorAPI.InsertDraft();
  const { draft, setMode, draftItemsDTO, setDraftItemsDTO } = useDraftEditor();
  
  return (
  <>
    <Button 
      onClick={() => {
        if (draft?.content.trim() === '')
          return;
        insertDraft({ 
          title: draft?.title,
          content: draft!.content,
          priority: draft!.priority,
          subject: draft!.subject?.name,
          draft_items: draftItemsDTO
        });
        
        setMode('create');
      }}
    >Insert</Button>
    <Button 
      onClick={() => {
        if (draft?.content.trim() === '')
          return;
        insertDraft({ 
          title: draft?.title, 
          content: draft!.content,
          priority: draft!.priority,
          subject: draft!.subject?.name,
          draft_items: draftItemsDTO,
          to_deal: true
        });
        setMode('create');
      }}
    >To deal</Button>
    <Button onClick={() => console.log(draft)}>LOG</Button>
  </>
  )
}
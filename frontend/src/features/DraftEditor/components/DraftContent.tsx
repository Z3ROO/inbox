import { useDraftEditor } from '../store/DraftEditorContext';
import * as DraftEditorAPI from '@/features/DraftEditor/api';
import { LoadingSpinner } from '@z3ro/nano';
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from '@z3ro/nano';
import { InsertDraftItem } from './InsertDraftItem';
import { DraftItemDTO, IDraft } from 'shared-types';
import { Button } from '@z3ro/nano';
import { Checkbox } from '@z3ro/nano';
import { useEffect, useRef } from 'react';

export function DraftContent(props: React.HTMLAttributes<HTMLDivElement>){
  const { draft, setDraft, mode } = useDraftEditor();
  const updateDraft = DraftEditorAPI.UpdateDraft();//Talvez seja melhor isolar isso tambem.

  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLPreElement>(null);
  
  const input_TW = 'bg-transparent text-gray-250 w-full overflow-hidden min-h-[2.5rem] p-2 cursor-text outline-none';

  useEffect(() => {
    if (!titleRef.current || !contentRef.current)
      return

    titleRef.current.innerText = draft!.title;
    contentRef.current.innerHTML = draft!.content;
    ResizeTextArea(contentRef.current);
  }, [draft?._id, draft?.created_at, mode, titleRef.current, contentRef.current])

  return (
    <div className="relative flex flex-col h-80 p-2 bg-gray-550 shadow-inner shadow-gray-800 border border-gray-900 rounded-sm " {...props}>
      <div
        className={` font-bold ${input_TW}`}
        ref={titleRef}
        
        onInput={e => {
          const target = (e.target as HTMLElement);
          
          setDraft(prev => ({ ...prev!, title: target.textContent as string }));
          
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}
        onKeyDown={(e) => {
          const target = (e.target as HTMLElement);
          if (target.textContent!.length >= 128 && e.key !== 'Backspace' && e.key !== 'Delete' && !e.key.includes('Arrow')) {
            e.preventDefault();
            return;
          }
            
          const key = e.key;

          if (key === 'Enter') return;
        }}

        contentEditable
      />
      <hr className='m-1 border-gray-900'/>
      <div className='overflow-auto custom-scrollbar'>
        
        <pre
          className={` whitespace-pre-wrap  ${input_TW}`}
          ref={contentRef}
          onInput={e => {
            
            const target = (e.target as HTMLElement);
            
            setDraft(prev => ({ ...prev!, content: target.textContent as string }));
            ResizeTextArea(target);
          }}
          onKeyDown={(e) => {
            const key = e.key
            const target = (e.target as HTMLElement);
            
            if (key === 'Enter'){
              e.preventDefault(); // Prevent default behavior (creating a new div)

              const selection = window.getSelection();
              if (!selection) return;

              const range = selection.getRangeAt(0);

              // Create a new text node containing a newline character
              const br = document.createTextNode('\n');
              
              // Insert the newline character at the current selection  
              if (
                range.startOffset === range.endOffset &&
                range.endOffset === range.endContainer.textContent?.length &&
                range.endContainer.textContent?.slice(-1) !== '\n'
                )
                range.insertNode(document.createTextNode('\n'));

              range.insertNode(br);
              
              
              range.setStartAfter(br);
              range.setEndAfter(br);

              selection.removeAllRanges();
              selection.addRange(range);

              
              console.log(target.innerText)
              setDraft(prev => ({ ...prev!, content: target.textContent as string }));
              ResizeTextArea(target);
            }

            
          }}

          contentEditable
        />
        { mode === 'edit' && <DraftItems /> }
        { mode === 'create' && <DraftItemsCreate /> }
      
      </div>
      <LoadingSpinner isLoading={updateDraft.isLoading} className='top-4 right-4' />
    </div>
  )
}

function DraftItemsCreate() {
  const { draft, draftItemsDTO: items } = useDraftEditor(); 

  return (
    <>
      {
        items.map(item => (
          <div className='flex'>
            <Checkbox.doted className='w-6 shadow-sm' />
            <span>
              {item.value}
            </span>
            <DraftItemOptionsCreate {...{ item }}/>
          </div>
        ))
      }
      <InsertDraftItem />
    </>
  )
}

function DraftItemOptionsCreate({ item }: { item: DraftItemDTO }) {
  const { draft, mode, setDraftItemsDTO } = useDraftEditor()!;

  if (mode === 'create')
    return (
      <Button onClick={() =>{ setDraftItemsDTO(prev => prev.filter(v => v.value !== item.value))}}>x</Button>
    )
  

  return null;
}


function DraftItems() {
  const { draft } = useDraftEditor()!; 
  const {data: items} = DraftEditorAPI.QueryDraftItems({draft_id: draft!._id});

  if (items == null)
    return null

  return (
    <>
      {
        items.map(item => (
          <div className='flex'>
            <Checkbox.doted className='w-6 shadow-sm' />
            <span>
              {item.content}
            </span>
            <DraftItemOptions {...{ item }}/>
          </div>
        ))
      }
      <InsertDraftItem />
    </>
  )
}

function DraftItemOptions({ item }: { item: IDraft }) {
  const { draft, mode } = useDraftEditor()!;
  const detachDraftItem = DraftEditorAPI.DetachDraftItem();

  
  if (mode === 'edit')
    return (
      <DropDownMenu>
        <DropDownMenuTriggerOnClick>...</DropDownMenuTriggerOnClick>
        <DropDownMenuContent position='top'>
          <DropDownMenuItem onClick={() => detachDraftItem({type: 'unlink', parent_draft_id: draft!._id, child_draft_id:item._id})}>
            unlink
          </DropDownMenuItem>
          <DropDownMenuItem onClick={() => detachDraftItem({type: 'delete', parent_draft_id: draft!._id, child_draft_id:item._id})}>
            delete
          </DropDownMenuItem>
        </DropDownMenuContent>
      </DropDownMenu>
    )

  return null;
}

function ResizeTextArea(target: HTMLElement) {
  target.style.height = 'auto';
  target.style.height = target.scrollHeight + 'px';
}
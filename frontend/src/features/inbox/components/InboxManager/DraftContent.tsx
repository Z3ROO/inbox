import { useDraftEditor } from '../../store/DraftEditorContext';
import * as InboxAPI from '@/features/inbox/api';
import { LoadingSpinner } from '@/components/Loading';
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from '@/components/dropdown';
import { InsertDraftItem } from './InsertDraftItem';
import { DraftItemDTO, IDraft } from 'shared-types';
import { Button } from '@/components/Buttons';
import { Checkbox } from '@/components/icons/UI';

export function DraftContent(props: React.HTMLAttributes<HTMLDivElement>){
  const { draft, setDraft, mode } = useDraftEditor()!;
  const updateDraft = InboxAPI.UpdateDraft();//Talvez seja melhor isolar isso tambem.
  
  const input_TW = 'bg-transparent text-gray-250 w-full overflow-hidden min-h-[2.5rem] p-2 cursor-text outline-none';

  return (
    <div className="relative flex flex-col h-72 p-2 bg-gray-550 shadow-inner shadow-gray-800 border border-gray-900 rounded-sm" {...props}>
      <div
        className={` font-bold ${input_TW}`}
        dangerouslySetInnerHTML={{__html: draft!.title}}
        
        onChange={e => {
          const target = (e.target as HTMLElement);
          setDraft(prev => ({ ...prev!, title: target.innerText }));
          
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}

        contentEditable
      />
      <hr className='m-1 border-gray-900'/>
      <div className='overflow-auto custom-scrollbar'>
        
        <div
          className={`  ${input_TW}`}
          dangerouslySetInnerHTML={{__html: draft!.content}}

          onChange={e => {
            const target = (e.target as HTMLElement);

            setDraft(prev => ({ ...prev!, content: target.innerText }));
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
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
  const { draft, draftItemsDTO: items } = useDraftEditor()!; 

  if (items == null)
    return null

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
  const {data: items} = InboxAPI.QueryDraftItems({draft_id: draft!._id});

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
  const detachDraftItem = InboxAPI.DetachDraftItem();

  
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
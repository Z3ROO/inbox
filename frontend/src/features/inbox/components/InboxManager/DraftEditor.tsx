import { Textarea } from '@/components/form/Input';
import { useInboxContext } from '../../store/InboxContext';
import * as InboxAPI from '@/features/inbox/api';
import { LoadingSpinner } from '@/components/Loading';
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from '@/components/dropdown';
import { InsertDraftItem } from './InsertDraftItem';
import { DraftItemDTO, IDraft } from 'shared-types';
import { Button } from '@/components/Buttons';

export function DraftEditor(props: React.HTMLAttributes<HTMLDivElement>){
  const { draft, setDraft } = useInboxContext()!;
  const updateDraft = InboxAPI.UpdateDraft();//Talvez seja melhor isolar isso tambem.
  

  return (
    <div className="relative h-72 overflow-auto" {...props}>
      <Textarea
        className={`resize-none w-full h-10 font-bold`}
        value={draft!.title} onChange={e => setDraft(prev => ({ ...prev!, title: e.target.value }))}
      />
      <Textarea
        className={`resize-none w-full h-full`}
        value={draft!.content} onChange={e => setDraft(prev => ({ ...prev!, content: e.target.value }))}
      />
      <DraftItems />
      <LoadingSpinner isLoading={updateDraft.isLoading} className='top-4 right-4' />
    </div>
  )
}

function DraftItems() {
  const { draft } = useInboxContext()!; 
  const {data: items} = InboxAPI.QueryDraftItems({draft_id: draft!._id});

  if (items == null)
    return null

  return (
    <>
      {
        items.map(item => (
          <div className='flex'>
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
  const { draft, mode } = useInboxContext()!;
  const detachDraftItem = InboxAPI.DetachDraftItem();

  if (mode === 'create')
    return (
      <Button onClick={() =>{}}>x</Button>
    )
  
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
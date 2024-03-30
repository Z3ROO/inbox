import { Textarea } from '@/components/form/Input';
import { useEffect, useState } from 'react';
import { useInboxContext } from '../../store/InboxContext';
import * as InboxAPI from '@/features/inbox/api';
import { LoadingSpinner } from '@/components/Loading';
import { IDraft, DraftItemDTO } from 'shared-types';
import { Modal } from '@/components/Modal';
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from '@/components/dropdown';

export function DraftEditor(props: React.HTMLAttributes<HTMLDivElement>){
  const { inboxManagerTextarea, setInboxManagerTextarea, inboxManagerTitle, setInboxManagerTitle } = useInboxContext()!;
  const inboxQuery = InboxAPI.QueryInbox();
  const inbox = inboxQuery.data!; 

  const updateDraft = InboxAPI.UpdateDraft();

  useEffect(() => {
    setInboxManagerTitle(inbox[0].title);
    setInboxManagerTextarea(inbox[0].content);
  }, [inbox]);

  return (
    <div className="relative h-72 overflow-auto" {...props}>
      <Textarea
        className={`resize-none w-full h-10 font-bold`}
        value={inboxManagerTitle} onChange={e => setInboxManagerTitle(e.target.value)}
      />
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxManagerTextarea} onChange={e => setInboxManagerTextarea(e.target.value)}
      />
      <DraftItems />
      <LoadingSpinner isLoading={updateDraft.isLoading} className='top-4 right-4' />
    </div>
  )
}

function DraftItems() {
  const { data: inbox } = InboxAPI.QueryInbox();
  const currentDraft = inbox![0];
  const [newItem, setNewItem] = useState<DraftItemDTO|null>(null);
  const {data: items} = InboxAPI.QueryDraftItems({draft_id: currentDraft._id});
  const detachDraftItem = InboxAPI.DetachDraftItem();

  return (
    <>
      {
        (items||[]).map(item => (
          <div className='flex'>
            <span>
            {item.content}
            </span>
            <DropDownMenu>
              <DropDownMenuTriggerOnClick>x</DropDownMenuTriggerOnClick>
              <DropDownMenuContent position='top'>
                <DropDownMenuItem onClick={() => detachDraftItem({type: 'delete', parent_draft_id: currentDraft._id, child_draft_id:item._id})}>delete</DropDownMenuItem>
                <DropDownMenuItem onClick={() => detachDraftItem({type: 'unlink', parent_draft_id: currentDraft._id, child_draft_id:item._id})}>unlink</DropDownMenuItem>
              </DropDownMenuContent>
            </DropDownMenu>
          </div>
        ))
      }
      {
        newItem ? (
          <ChooseNewDraftItem {...{newItem, setNewItem}} />
        ) : (
          <ChooseItemTypeButton  {...{newItem, setNewItem}} />
        )
      }
    </>
  )
}

function ChooseNewDraftItem({newItem, setNewItem}: { newItem: DraftItemDTO, setNewItem: React.Dispatch<React.SetStateAction<DraftItemDTO | null>> }) {
  const attachDraftItem = InboxAPI.AttachDraftItem();
  const { data: inbox } = InboxAPI.QueryInbox();
  const currentDraft = inbox![0];

  return (
    <div className='flex'>
      <ChooseItemTypeButton  {...{newItem, setNewItem}} />
      {
        newItem.type === 'new' && (
          <div>
            <input value={newItem.value} onChange={e => setNewItem({type: 'new', value: e.target.value})} />
            <button className='px-1.5 rounded border' onClick={() => {setNewItem(null)}}>XX</button>
          </div>
        )
      }
      {
        newItem.type === 'existing' && (
          <SearchDrafts result={(draft) => { setNewItem({type:'existing', value: draft._id})}} />
        )
      }
      <button className='px-1.5 rounded border' onClick={() => { attachDraftItem({draft_id: currentDraft._id, ...newItem}); setNewItem(null) }} disabled={newItem.value.trim() === ''}>send</button>
    </div>
  )
}

function ChooseItemTypeButton({newItem, setNewItem}: { newItem: DraftItemDTO|null, setNewItem: React.Dispatch<React.SetStateAction<DraftItemDTO | null>> }) {
  return (
    <div className='w-min relative'>
      <DropDownMenu>
        <DropDownMenuTriggerOnClick>+</DropDownMenuTriggerOnClick>
        <DropDownMenuContent position='top' align='start'>
          <DropDownMenuItem onClick={() => setNewItem({type: 'new', value: ''})}>New</DropDownMenuItem>
          <DropDownMenuItem onClick={() => setNewItem({type: 'existing', value: ''})}>Existing</DropDownMenuItem>
        </DropDownMenuContent>
      </DropDownMenu>
    </div>
  )
}

function SearchDrafts(props: {result:(draft:IDraft) => void}) {
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const { data: searchResults } = InboxAPI.SearchDrafts({search});

  return (
    <>
      <div>
        <button onClick={() => setModal(true)}>Search drafts</button>
      </div>
      <Modal isModalOpen={modal} closeFn={() => setModal(false)}>
        <input value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
        <div className='overflow-auto max-h-[36rem]'>
        <button onClick={() => setSearch(searchInput)}>search</button>
        <div className='max-w-3xl flex flex-wrap'>
          {
            (searchResults || []).map(draft => (
              <div className='p-4 m-2 rounded-sm border text-white border-white w-80' onClick={()=> {props.result(draft); setModal(false)}}>
                {draft.title && <h4>{draft.title}</h4>}
                <p>{draft.content}</p>
              </div>
            ))
          }
        </div>
        </div>
      </Modal>
    </>
  )
}
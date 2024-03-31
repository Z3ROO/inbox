import { Textarea } from '@/components/form/Input';
import { useEffect, useState } from 'react';
import { useInboxContext } from '../../store/InboxContext';
import * as InboxAPI from '@/features/inbox/api';
import { LoadingSpinner } from '@/components/Loading';
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from '@/components/dropdown';
import { NewDraftItem } from './NewDraftItem';

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

function DraftItems(props: {}) {
  const { data: inbox } = InboxAPI.QueryInbox();
  const currentDraft = inbox![0];
  const {data: items} = InboxAPI.QueryDraftItems({draft_id: currentDraft._id});
  const attachDraftItem = InboxAPI.AttachDraftItem();
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
      <NewDraftItem cb={(newItem) => { attachDraftItem({draft_id: currentDraft._id, ...newItem}) }} />
    </>
  )
}

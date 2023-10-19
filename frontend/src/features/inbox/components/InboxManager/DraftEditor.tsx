import { Textarea } from '@/components/form/Input';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useInboxContext } from '../../store/InboxContext';
import * as InboxAPI from '@/features/inbox/api';

export function DraftEditor(props: React.HTMLAttributes<HTMLDivElement>){
  const { inboxManagerTextarea, setInboxManagerTextarea } = useInboxContext()!;
  const inboxQuery = InboxAPI.QueryInbox();
  const inbox = inboxQuery.data; 

  const updateDraft = InboxAPI.UpdateDraft();

  useEffect(() => {
    setInboxManagerTextarea(inbox![0].content);
  }, [inbox]);


  return (
    <div className="relative h-72" {...props}>
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxManagerTextarea} onChange={e => setInboxManagerTextarea(e.target.value)}
      />
      {
        updateDraft.isLoading &&
        <BiLoaderAlt className="absolute top-4 right-4 animate-spin" />
      }
    </div>
  )
}


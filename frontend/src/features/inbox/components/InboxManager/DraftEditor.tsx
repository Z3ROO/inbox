import { Textarea } from '@/components/form/Input';
import { useEffect } from 'react';
import { useInboxContext } from '../../store/InboxContext';
import * as InboxAPI from '@/features/inbox/api';
import { LoadingSpinner } from '@/components/Loading';

export function DraftEditor(props: React.HTMLAttributes<HTMLDivElement>){
  const { inboxManagerTextarea, setInboxManagerTextarea } = useInboxContext()!;
  const inboxQuery = InboxAPI.QueryInbox();
  const inbox = inboxQuery.data!; 

  const updateDraft = InboxAPI.UpdateDraft();

  useEffect(() => {
    setInboxManagerTextarea(inbox[0].content);
  }, [inbox]);

  return (
    <div className="relative h-72" {...props}>
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxManagerTextarea} onChange={e => setInboxManagerTextarea(e.target.value)}
      />
      <LoadingSpinner isLoading={updateDraft.isLoading} className='top-4 right-4' />
    </div>
  )
}

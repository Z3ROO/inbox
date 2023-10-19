import { Textarea } from '@/components/form/Input';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useFilterPanelContext } from '../../store/FilterPanelContext';
import * as InboxAPI from '@/features/inbox/api';

export function InputField(props: React.HTMLAttributes<HTMLDivElement>){
  const { inboxFilterTextarea, setInboxFilterTextarea } = useFilterPanelContext()!;
  const inboxQuery = InboxAPI.QueryInbox();
  const inbox = inboxQuery.data; 

  const updateDraft = InboxAPI.UpdateDraft();

  useEffect(() => {
    setInboxFilterTextarea(inbox![0].content);
  }, [inbox]);


  return (
    <div className="relative h-72" {...props}>
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxFilterTextarea} onChange={e => setInboxFilterTextarea(e.target.value)}
      />
      {
        updateDraft.isLoading &&
        <BiLoaderAlt className="absolute top-4 right-4 animate-spin" />
      }
    </div>
  )
}


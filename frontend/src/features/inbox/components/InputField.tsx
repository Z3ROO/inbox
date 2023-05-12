import { Textarea } from '@/components/form/Input';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useFilterPanelContext } from '../store/FilterPanelContext';
import * as InboxAPI from '@/features/inbox/api';

export function InputField(props: React.HTMLAttributes<HTMLDivElement>){
  const { inboxFilterTextarea, setInboxFilterTextarea } = useFilterPanelContext()!;
  const inboxQuery = InboxAPI.QueryInboxItems();
  const inboxItems = inboxQuery.data; 

  const updateInboxItem = InboxAPI.UpdateInboxItem();

  useEffect(() => {
    setInboxFilterTextarea(inboxItems![0].content);
  }, [inboxItems]);


  return (
    <div className="relative h-72" {...props}>
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxFilterTextarea} onChange={e => setInboxFilterTextarea(e.target.value)}
      />
      {
        updateInboxItem.isLoading &&
        <BiLoaderAlt className="absolute top-4 right-4 animate-spin" />
      }
    </div>
  )
}


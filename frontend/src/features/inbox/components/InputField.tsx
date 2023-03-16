import { Textarea } from '@/components/form/Input';
import { useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useFilterPanelContext } from '../store/FilterPanelContext';

export function InputField(props: React.HTMLAttributes<HTMLDivElement>){
  const { inboxItems, inboxFilterText, setInboxFilterText, updateInboxItem } = useFilterPanelContext()!;

  useEffect(() => {
    setInboxFilterText(inboxItems![0].content);
  }, [inboxItems]);


  return (
    <div {...props}>
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxFilterText} onChange={e => setInboxFilterText(e.target.value)}
      />
      {
        updateInboxItem.isLoading &&
        <BiLoaderAlt className="absolute top-4 right-4 animate-spin" />
      }
    </div>
  )
}


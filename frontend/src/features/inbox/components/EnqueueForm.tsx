import { queryClient } from "@/App";
import { BtnPrimary } from "@/components/Buttons";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import * as InboxAPI from '@/features/inbox/api';

export function Enqueue() {
  const { setPanelMode, inboxItems } = useFilterPanelContext()!
  const inboxItem_id = inboxItems![0]._id;

  const enqueueInboxItem = InboxAPI.EnqueueInboxItem();
 
  function enqueueEventHandler(priority: number) {
    return () => enqueueInboxItem(
      { priority, inboxItem_id },
      {
        onSuccess() {
          queryClient.refetchQueries(['inbox-items'], { active: true, exact: true });
          setPanelMode('normal');
        }
      }
    );
  } 

  return (
    <div className={`flex flex-wrap justify-center items-center`} >
      <BtnPrimary onClick={enqueueEventHandler(0)}>Urgent</BtnPrimary>
      <BtnPrimary onClick={enqueueEventHandler(1)}>Important/Necessary</BtnPrimary>
      <BtnPrimary onClick={enqueueEventHandler(2)}>Important</BtnPrimary>
      <BtnPrimary onClick={enqueueEventHandler(3)}>Necessary</BtnPrimary>
      <BtnPrimary onClick={enqueueEventHandler(4)}>Should be done</BtnPrimary>
    </div>
  )
}


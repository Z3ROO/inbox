import { queryClient } from "@/App";
import { BtnPrimary } from "@/components/Buttons";
import { useMutation } from "react-query";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import * as InboxAPI from '@/features/inbox/api';

export function Enqueue() {
  const { panelMode, setPanelMode, inboxItems } = useFilterPanelContext()!
  const inboxItem_id = inboxItems![0]._id;

  const enqueueMutation = useMutation(InboxAPI.enqueueInboxItem);
 
  function enqueueInboxItem(priority: number) {
    enqueueMutation.mutate(
      {priority, inboxItem_id},{
        onSuccess() {
          queryClient.refetchQueries(['inbox-items'], { active: true, exact: true });
          setPanelMode('normal');
        }
      }
    );

  } 

  return (
    <div className={`flex flex-wrap justify-center items-center`} >
      <BtnPrimary onClick={() => enqueueInboxItem(0)}>Urgent</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(1)}>Important/Necessary</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(2)}>Important</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(3)}>Necessary</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(4)}>Should be done</BtnPrimary>
    </div>
  )
}



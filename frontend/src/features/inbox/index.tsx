/* eslint-disable react-hooks/exhaustive-deps */
import { InboxContextProvider, useInboxContext } from "./store/InboxContext";
import { InboxInsertPanel } from './components/InsertDraft/InsertPanel';
import { InboxManagerModal } from './components/InboxManager';
import { Button } from "@/components/Buttons";

export default function Inbox() {
  return (
    <div className="mt-8">
      <InboxContextProvider>
        <h4 className="text-tanj-green">Inbox</h4>
        <InboxInsertPanel />
        <InboxManagerModal />
      </InboxContextProvider>
    </div>
  )
}

function InitWidget() {
  const inboxContext = useInboxContext();

  if (!inboxContext)
    return null;

  return (
    <div>
      <Button onClick={() => inboxContext.setMode('create')}>add</Button>
      <Button onClick={() => inboxContext.setMode('edit')}>edit</Button>
    </div>
  );
}
/* eslint-disable react-hooks/exhaustive-deps */
import { InboxContextProvider } from "./store/InboxContext";
import { InboxInsertPanel } from './components/InsertDraft/InsertPanel';
import { InboxManagerModal } from './components/InboxManager';

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

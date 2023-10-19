/* eslint-disable react-hooks/exhaustive-deps */
import { FilterPanelContextProvider } from "./store/FilterPanelContext";
import { InboxInsertPanel } from './components/InsertDraft/InsertPanel';
import { InboxFilterPanelModal } from './components/InboxManager/FilterPanel';

export default function Inbox() {
  return (
    <div className="mt-8">
      <FilterPanelContextProvider>
        <h4 className="text-tanj-green">Inbox</h4>
        <InboxInsertPanel />
        <InboxFilterPanelModal />
      </FilterPanelContextProvider>
    </div>
  )
}

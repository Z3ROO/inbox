/* eslint-disable react-hooks/exhaustive-deps */
import { FilterPanelContextProvider, useFilterPanelContext } from "./store/FilterPanelContext";
import { InboxInsertPanel } from './components/InsertPanel';
import { InboxFilterPanelModal } from './components/FilterPanel';


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

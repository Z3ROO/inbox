/* eslint-disable react-hooks/exhaustive-deps */
import { FilterPanelContextProvider, useFilterPanelContext } from "./store/FilterPanelContext";
import { InboxInsertPanel } from './components/InsertPanel';
import { InboxFilterPanelModal } from './components/FilterPanel';
import { FocusedProjectsWidget } from "@/features/projects";


export default function Inbox() {
  return (
    <div className="mt-8">
      <FilterPanelContextProvider>
        <div className="flex">
          <FocusedProjectsWidget />
          <div>
          <h4 className="text-tanj-green">Inbox</h4>
          <InboxInsertPanel />
          </div>
        </div>
        <InboxFilterPanelModal />
      </FilterPanelContextProvider>
    </div>
  )
}

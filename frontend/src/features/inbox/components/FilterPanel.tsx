import { Modal } from "@/components/Modal";
import { useFilterPanelContext } from "@/features/inbox/store/FilterPanelContext";
import { StatusLog } from "./StatusLog";
import { InputField } from "./InputField";
import { Controlls } from "./Controlls";

export function InboxFilterPanelModal() {
  const { isFilterPanelOpen, toggleFilterPanel } = useFilterPanelContext()!;

  return (
    <Modal isModalOpen={isFilterPanelOpen} closeFn={toggleFilterPanel}>
      <FilterPanel />
    </Modal>
  )
}

function FilterPanel() {
  const { inboxQuery } = useFilterPanelContext()!;
  
/*
* All the proceding use of inboxItems depends on these conditions
* */
  if (inboxQuery.isLoading)
    return <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
  if (inboxQuery.error)
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong</h2>
  // ?? check if is idle ??
  if (!inboxQuery.data || inboxQuery.data.length === 0)
    return (
      <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
    )

  return (
    <div className="w-[30rem] m-2">
      <span className="text-tanj-green font-medium text-3xl">Inbox:</span>
      <InputField className="relative h-56"/>
      <StatusLog />
      <Controlls />
    </div>
  )
}


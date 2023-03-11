import { Modal } from "@/components/Modal";
import { useFilterPanelContext } from "@/features/inbox/store/FilterPanelContext";
import { EnqueueInboxItemButton } from "./EnqueueInboxItemButton";
import { ChooseProjectButton } from "./ChooseProjectButton";
import { ConfigField } from "./ConfigField";
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
  const { panelMode, inboxQuery } = useFilterPanelContext()!;


  return (
    <div className="w-[30rem] m-2">
      <div className="flex justify-between">
        <span className="text-tanj-green font-medium text-3xl">Inbox:</span>
        <ChooseProjectButton />
      </div>
      <div className="relative h-56">
        {
          panelMode === 'normal' ? <InputField /> : <ConfigField />
        }
      </div>
      <div className="flex justify-between">
        <EnqueueInboxItemButton />
        <StatusLog />
      </div>
      <Controlls />
    </div>
  )
}



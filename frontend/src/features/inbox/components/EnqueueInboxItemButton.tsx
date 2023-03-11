import { BtnSecondary } from "@/components/Buttons";
import { HiArrowDownOnSquareStack } from "react-icons/hi2";
import { useFilterPanelContext } from "../store/FilterPanelContext";

export function EnqueueInboxItemButton() {
  const { inboxItems, setPanelMode } = useFilterPanelContext()!;

  const currentInboxItem = inboxItems[0];

  return (
    <BtnSecondary icon bgLess 
      className="m-0 py-0" 
      disabled={!currentInboxItem.project?.name} 
      onClick={() => setPanelMode(prev => prev === 'enqueue' ? 'normal' : 'enqueue')}
    >
      <HiArrowDownOnSquareStack className="w-4 h-4" />
    </BtnSecondary>
  )
}



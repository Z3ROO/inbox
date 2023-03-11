import { useFilterPanelContext } from "@/features/inbox/store/FilterPanelContext";
import { PanelMode } from "@/features/inbox/types";
import { Enqueue } from "./EnqueueForm";
import { SelectProject } from "./SetProjectForm";

export function ConfigField() {
  const { panelMode } = useFilterPanelContext()!;
  const content = SwitchSetters(panelMode);

  return (
    <div className="w-full h-full border-2 border-tanj-green rounded-sm bg-tanj-gray">
      {content}
    </div>
  )
}

function SwitchSetters(mode: PanelMode): JSX.Element | null {
  switch (mode) {
    case 'enqueue':
      return <Enqueue />
    case 'select-project':
      return <SelectProject />
    default:
      return null
  }
}


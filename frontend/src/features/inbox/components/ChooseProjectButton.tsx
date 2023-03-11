import { BtnSecondary } from '@/components/Buttons';
import { useFilterPanelContext } from '@/features/inbox/store/FilterPanelContext';

export function ChooseProjectButton() {
  const { inboxItems, setPanelMode } = useFilterPanelContext()!;

  const currentInboxItem = inboxItems[0];

  return (
    <BtnSecondary bgLess 
      className="m-0"
      onClick={() => setPanelMode(prev => prev === 'select-project' ? 'normal' : 'select-project')}
    >
      <span>{currentInboxItem.project?.name || 'Choose a project'}</span>
    </BtnSecondary>
  )
}


import { useDraftEditor } from '../../store/DraftEditorContext';
export function StatusLog() {
  return (
    <div className="text-right">
      <LastDelayLog />
    </div>
  )
}

export function LastDelayLog() {
  const { draft } = useDraftEditor();

  // If never delayed, no log.
  if (draft!.delay == null)
    return null;

  const { delay, delay_quantity, delayed_at } = draft!;

  let amountDelayed = delay_quantity ? ` ${delay_quantity} ${delay}` : `a ${delay}`

  //if draft.delay is not null, therefore delayed_at has value
  const dateDelayed = new Date(delayed_at!).toLocaleDateString(['pt-BR']);

  return (
    <span className="text-sm text-tanj-green">
      { `Delayed for ${amountDelayed} on ${dateDelayed}.` }
    </span>
  )
}


import { useFilterPanelContext } from "../store/FilterPanelContext";

export function LastDelayLog() {
  const { inboxItems } = useFilterPanelContext()!;
  const currentInboxItem = inboxItems[0]

  if (currentInboxItem.last_delay == null)
    return null;

  const { delayed_at, amount } = currentInboxItem.last_delay;

  let amountDelayed = amount.replace(/-/g, ' ');
  if (amount.includes('-'))
    amountDelayed = 'a ' + amountDelayed;

  const dateDelayed = new Date(delayed_at).toLocaleDateString(['pt-BR']);

  return (
    <span className="text-sm text-tanj-green">
      { `Delayed for ${amountDelayed} on ${dateDelayed}.` }
    </span>
  )
}


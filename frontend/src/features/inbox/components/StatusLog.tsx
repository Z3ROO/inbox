import * as InboxAPI from '@/features/inbox/api';
export function StatusLog() {
  return (
    <div className="text-right">
      <LastDelayLog />
    </div>
  )
}

export function LastDelayLog() {
  const inboxQuery = InboxAPI.QueryInboxItems();
  const inboxItems = inboxQuery.data; 

  const currentInboxItem = inboxItems![0];

  if (currentInboxItem.last_delay == null)
    return null;

  const { delayed_at, amount, quantity } = currentInboxItem.last_delay;

  let amountDelayed = quantity ? ` %{quantity} ${amount}` : `a ${amount}`

  const dateDelayed = new Date(delayed_at).toLocaleDateString(['pt-BR']);

  return (
    <span className="text-sm text-tanj-green">
      { `Delayed for ${amountDelayed} on ${dateDelayed}.` }
    </span>
  )
}


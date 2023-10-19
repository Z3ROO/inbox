import * as InboxAPI from '@/features/inbox/api';
export function StatusLog() {
  return (
    <div className="text-right">
      <LastDelayLog />
    </div>
  )
}

export function LastDelayLog() {
  const inboxQuery = InboxAPI.QueryInbox();
  const inbox = inboxQuery.data!; 

  const currentDraft = inbox[0];

  // If never delayed, no log.
  if (currentDraft.last_delay == null)
    return null;

  const { delayed_at, amount, quantity } = currentDraft.last_delay;

  let amountDelayed = quantity ? ` ${quantity} ${amount}` : `a ${amount}`

  const dateDelayed = new Date(delayed_at).toLocaleDateString(['pt-BR']);

  return (
    <span className="text-sm text-tanj-green">
      { `Delayed for ${amountDelayed} on ${dateDelayed}.` }
    </span>
  )
}


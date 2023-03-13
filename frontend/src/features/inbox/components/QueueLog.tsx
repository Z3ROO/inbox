import { useFilterPanelContext } from "../store/FilterPanelContext";

export function QueueLog() {
  const { inboxItems } = useFilterPanelContext()!;
  if (inboxItems![0].project?.queue == null)
    return null;

  return (
    <>
      <br/>
      <span className="text-sm text-tanj-green">
        Inbox item queued to be done.
      </span>
    </>
  )
}


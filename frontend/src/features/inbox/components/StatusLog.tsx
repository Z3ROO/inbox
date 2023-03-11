import { LastDelayLog } from "./LastDelayLog";
import { QueueLog } from "./QueueLog";

export function StatusLog() {
  return (
    <div className="text-right">
      <LastDelayLog />
      <QueueLog />
    </div>
  )
}


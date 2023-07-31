import { BtnSecondary } from "@/components/Buttons";
import { HiMiniBackspace } from 'react-icons/hi2';
import { Link } from "react-router-dom";
import { ActiveGoalsManager } from "@/features/goals/components/ActiveGoalsManager";
import { QueuedGoalsManager } from "@/features/goals/components/QueuedGoalsManager";

export function Manager() {
  return (
    <div className="w-full h-full">
      <Link to="/">
        <BtnSecondary className="absolute top-6 left-6 p-2 z-10" icon>
          <HiMiniBackspace />
        </BtnSecondary>
      </Link>
      <div className="w-full h-full relative flex justify-center overflow-auto">
        <div className="w-full max-w-3xl ">
          <ActiveGoalsManager />
          <QueuedGoalsManager />
        </div>
      </div>
    </div>
  );
}

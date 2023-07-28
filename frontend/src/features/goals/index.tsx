import { BtnSecondary } from "@/components/Buttons";
import { HiMiniBackspace } from 'react-icons/hi2';
import { Link } from "react-router-dom";
import { ActiveGoalsManager } from "./components/ActiveGoalsManager";

export * from './components/Widget';

export function Manager() {
  return (
    <div className="w-full h-full relative flex justify-center">
      <Link to="/">
        <BtnSecondary className="absolute top-6 left-6 p-2" icon>
          <HiMiniBackspace />
        </BtnSecondary>
      </Link>
      <div>
        <div>
          <ActiveGoalsManager />
        </div>
      </div>
    </div>
  );
}


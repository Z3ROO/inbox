import { BtnSecondary } from "@/components/Buttons";
import { AiTwotoneEdit } from "react-icons/ai";
import { IGoal } from "../types";
import { Goal } from "./Goal";

export function EditableGoal({ goal }: { goal: IGoal }) {
  return (
    <div className="relative">
      <BtnSecondary className='absolute top-1 right-1' icon>
        <AiTwotoneEdit className='text-tanj-green' />
      </BtnSecondary>
      <Goal {...{goal}} />
    </div>
  )
}
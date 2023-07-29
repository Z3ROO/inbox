import { BtnSecondary } from "@/components/Buttons";
import { AiTwotoneEdit } from "react-icons/ai";
import { IGoal } from "../types";
import { Goal } from "./Goal";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { EditGoal } from "./EditGoal";

export function EditableGoal({ goal }: { goal: IGoal }) {
  const [modal, setModal] = useState(false);
  return (
    <div className="relative">
      <BtnSecondary className='absolute top-1 right-1' onClick={() => setModal(true)} icon>
        <AiTwotoneEdit className='text-tanj-green' />
      </BtnSecondary>
      <Modal isModalOpen={modal} closeFn={() => setModal(false)}>
        <EditGoal data={goal} onSubmit={() => setModal(false)} />
      </Modal>
      <Goal {...{goal}} />
    </div>
  )
}
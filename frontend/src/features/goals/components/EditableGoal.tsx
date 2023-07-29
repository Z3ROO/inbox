import { BtnSecondary, OptionsButton } from "@/components/Buttons";
import { AiTwotoneEdit } from "react-icons/ai";
import { IGoal } from "../types";
import { Goal } from "./Goal";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { EditGoal } from "./EditGoal";
import * as GoalsAPI from '@/features/goals/api';

export function EditableGoal({ goal }: { goal: IGoal }) {
  const [modal, setModal] = useState(false);

  const focusGoal = GoalsAPI.FocusGoal();
  const activateGoal = GoalsAPI.ActivateGoal();

  return (
    <div className="relative">
      <OptionsButton className="absolute top-1 right-1" options={[
        {
          text: goal.focused ? 'Unfocus' : 'Focus',
          disabled: !goal.active,
          onClick: () => {
            if (goal.focused) {
              focusGoal({
                goal_id: goal._id,
                focus: false
              });
            }
            else {
              focusGoal({
                goal_id: goal._id
              })
            }
          }
        },
        {
          text: goal.active ? 'Deactivate' : 'Activate',
          onClick: () => {
            if (goal.active && goal.focused)
              return

            if (goal.active) {
              activateGoal({
                goal_id: goal._id,
                activate: false
              });
            }
            else {
              activateGoal({
                goal_id: goal._id
              })
            }
          }
        },
        {
          text: 'Edit',
          onClick: () => { setModal(true) }
        },
        {
          text: 'Delete',
          onClick: () => {}
        }
      ]} />
      <Modal isModalOpen={modal} closeFn={() => setModal(false)}>
        <EditGoal data={goal} onSubmit={() => setModal(false)} />
      </Modal>
      <Goal {...{goal}} />
    </div>
  )
}

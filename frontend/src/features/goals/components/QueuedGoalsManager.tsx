import * as GoalsAPI from '@/features/goals/api';
import { EditableGoal } from './EditableGoal';
import { BtnSecondary } from '@/components/Buttons';
import { FaPlus } from 'react-icons/fa';
import { AddGoal } from './AddGoal';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

export function QueuedGoalsManager() {

  return (
    <div className="flex flex-col p-8 px-12 w-full">
      <TitleAndAddButton />
      <QueuedGoals />
    </div>
  );
}

function TitleAndAddButton() {
  const [modal, setModal] = useState(false);

  return (
    <div className=''>
      <h4 className="text-tanj-green inline-block">Queued Goals</h4>
      <BtnSecondary icon
        className='align-bottom'
        onClick={() => setModal(prev => !prev)}
      >
        <FaPlus className='text-tanj-green' />
      </BtnSecondary>
      <Modal isModalOpen={modal} closeFn={() => setModal(false)}>
        <AddGoal onSubmit={() => setModal(false)} />
      </Modal>
    </div>
  )
}


function QueuedGoals() {
  const queryGoals = GoalsAPI.QueryQueuedGoals();
  const goals = queryGoals.data;

  if (queryGoals.isError || queryGoals.isIdle || queryGoals.isLoading)
    return null;
  
  return (
    <div>
      {
        goals!.map(goal => (
          <EditableGoal {...{goal}} />
        ))
      }
    </div>
  )
}

import * as GoalsAPI from '@/features/goals/api';
import { EditableGoal } from './EditableGoal';
import { BtnSecondary } from '@/components/Buttons';
import { FaPlus } from 'react-icons/fa';

export function AwaitingGoalsManager() {
  return (
    <div className="flex flex-col p-8 mx-4 w-max">
      <div className=''>
        <h4 className="text-tanj-green inline-block">Awaiting Goals</h4>
        <BtnSecondary className='align-bottom' icon>
          <FaPlus className='text-tanj-green' />
        </BtnSecondary>
      </div>
      <AwaitingGoalsEditable />
    </div>
  );
}


function AwaitingGoalsEditable() {
  const queryGoals = GoalsAPI.QueryAwaitingGoals();
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
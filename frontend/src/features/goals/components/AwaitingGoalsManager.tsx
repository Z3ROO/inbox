import * as GoalsAPI from '@/features/goals/api';
import { EditableGoal } from './EditableGoal';

export function AwaitingGoalsManager() {
  return (
    <div className="flex flex-col p-8 mx-4 w-max">
      <h4 className="text-tanj-green">Awaiting Goals</h4>
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
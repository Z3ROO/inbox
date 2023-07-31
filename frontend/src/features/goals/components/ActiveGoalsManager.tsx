import * as GoalsAPI from '@/features/goals/api';
import { EditableGoal } from './EditableGoal';

export function ActiveGoalsManager() {
  return (
    <div className="flex flex-col p-8 px-12 w-full">
      <h4 className="text-tanj-green">Active Goals</h4>
      <ActiveGoals />
    </div>
  );
}


function ActiveGoals() {
  const queryGoals = GoalsAPI.QueryActiveGoals();
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
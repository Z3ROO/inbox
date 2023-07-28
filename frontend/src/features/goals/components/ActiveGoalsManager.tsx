import * as GoalsAPI from '@/features/goals/api';
import { EditableGoal } from './EditableGoal';

export function ActiveGoalsManager() {
  return (
    <div className="flex flex-col p-8 mx-4 w-max">
      <h4 className="text-tanj-green">Active Goals</h4>
      <ActiveGoalsEditable />
    </div>
  );
}


function ActiveGoalsEditable() {
  const queryGoals = GoalsAPI.QueryGoals();
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
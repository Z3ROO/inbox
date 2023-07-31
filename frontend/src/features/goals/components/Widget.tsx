import { Link } from "react-router-dom";
import * as GoalsAPI from '@/features/goals/api';
import { Goal } from "./Goal";

export function Widget() {
  return (
    <div className="flex flex-col p-8 mx-4 w-max grow">
      <Link to="/goals">
        <h4 className="text-tanj-green">Goals</h4>
      </Link>
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
    <div className="max-w-md">
      {
        goals!.sort((x, y) => {
          if (x.focused)
            return -1
          return 1
        }).map(goal => <Goal {...{goal}} />)
      }
    </div>
  )
}

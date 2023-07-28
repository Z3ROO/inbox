import * as GoalsAPI from '@/features/goals/api';
import { Goal } from "./Goal";
import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { AiTwotoneEdit } from 'react-icons/ai';

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
          <div className="relative">
            <BtnSecondary className='absolute top-1 right-1' icon>
              <AiTwotoneEdit className='text-tanj-green' />
            </BtnSecondary>
            <Goal {...{goal}} />
          </div>
        ))
      }
    </div>
  )
}
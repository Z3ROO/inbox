import { useState } from 'react';
import * as GoalsAPI from '@/features/goals/api';
import { IGoal, ITask } from '@/features/goals/types';
import { Container } from '@/components/structure/container';
import { CheckBox } from '@/components/form/CheckBox';

export function Goal({ goal }: { goal: IGoal}) {
  const {
    _id,
    title,
    description,
    tasks
  } = goal;

  return (
    <Container className='my-4 w-full'>
      <h5 className="text-tanj-green">{title}</h5>
      <span className="text-tanj-green hover:text-[#4dbf82] whitespace-pre-wrap">{description}</span>
      <div>
        <ul>
          { tasks.map( task => <Task {...{goal, task}} />) }
        </ul>
      </div>
    </Container>
  )
}

function Task({task, goal}: { task: ITask, goal: IGoal}) {  
  const [check, setCheck] = useState(task.complete);
  const completeTask = GoalsAPI.CompleteTask({
    onSuccess(data) {
      setCheck(data.currentState);
    }
  });

  return (
    <li>
      <CheckBox checked={check} onChange={e => completeTask({goal_id: goal._id, task_id: task._id, state: e.target.checked})}>
        <span>{task.description}</span>
      </CheckBox>
    </li>
  )
}


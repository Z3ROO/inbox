import { useState } from 'react';
import { IoRadioButtonOnOutline, IoRadioButtonOffOutline } from 'react-icons/io5';
import * as GoalsAPI from '@/features/goals/api';
import { IGoal, ITask } from '@/features/goals/types';
import { Container } from '@/components/structure/container';

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
  const [radio, setRadio] = useState(task.complete);
  const completeTask = GoalsAPI.CompleteTask({
    onSuccess(data) {
      setRadio(data.current_state);
    }
  });

  return (
    <li>
      <CheckBox checked={radio} onChange={e => completeTask({goal_id: goal._id, task_id: task._id})}>
        <span>{task.description}</span>
      </CheckBox>
    </li>
  )
}

interface CustomCheckBox extends React.InputHTMLAttributes<HTMLInputElement> {

}

const CheckBox_TW = 'text-tanj-green mt-1 mr-1.5 shrink-0';
function CheckBox(props : CustomCheckBox) {
  
  return (
    <label className='cursor-pointer'>
      <input className="opacity-0" {...props} children={undefined} type="checkbox" hidden />
      <div className='flex'>
    
      {
        props.checked ? 
          <IoRadioButtonOnOutline className={CheckBox_TW} /> :
          <IoRadioButtonOffOutline className={CheckBox_TW} />
      }
      <span>
        {props.children}
      </span>
      </div>
    </label>
  );

}
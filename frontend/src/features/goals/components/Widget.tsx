import { useState, ReactNode } from 'react';
import { IoRadioButtonOnOutline, IoRadioButtonOffOutline } from 'react-icons/io5';
import { Link } from "react-router-dom";
import * as GoalsAPI from '@/features/goals/api';
import { IGoal, ITask } from '@/features/goals/types';


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
  const queryGoals = GoalsAPI.QueryGoals();
  const goals = queryGoals.data;

  if (queryGoals.isError || queryGoals.isIdle || queryGoals.isLoading)
    return null;
  
  return (
    <div>
      {
        goals!.map(goal => <Goal {...{goal}} />)
      }
    </div>
  )
}

function Goal({ goal }: { goal: IGoal}) {
  const {
    _id,
    title,
    description,
    tasks
  } = goal;

  return (
    <div className="relative p-4 my-4 to-tanj-gray from-tanj-brown bg-gradient-to-br rounded-sm w-full max-w-md group">
      <h5 className="text-tanj-green">{title}</h5>
      <span className="text-tanj-green hover:text-[#4dbf82] whitespace-pre-wrap">{description}</span>
      <div>
        <ul>
          { tasks.map( task => <Task {...{goal, task}} />) }
        </ul>
      </div>
    </div>
  )
}

function Task({task, goal}: { task: ITask, goal: IGoal}) {  
  const [radio, setRadio] = useState(task.complete);
  return (
    <li>
      <RadioButton checked={radio} onChange={e => setRadio(prev => !prev)}>
        <span>{task.description}</span>
      </RadioButton>
    </li>
  )
}

interface CustomRadioButton extends React.InputHTMLAttributes<HTMLInputElement> {

}

const CheckBox_TW = 'text-tanj-green mt-1 mr-1.5 shrink-0';
function RadioButton(props : CustomRadioButton) {
  
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
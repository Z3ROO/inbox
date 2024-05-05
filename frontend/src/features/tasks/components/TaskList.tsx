import { Container } from "@z3ro/nano";
import * as TasksAPI from "@/features/tasks/api";
import { ITask, TaskStatus } from "shared-types";
import { LoadingSpinner } from "@z3ro/nano";
import { useState } from "react";
import { DropDownMenu, DropDownMenuItem, DropDownMenuTriggerOnClick, DropDownMenuContent } from "@z3ro/nano";

import { DropDownTriggerOnClick } from "@z3ro/nano/ui/dropdown/DropDownEngine";
import { Priority, Checkbox, Util } from "@z3ro/nano";
import { Button } from "@z3ro/nano";

export function TaskList() {
  const {data: tasks} = TasksAPI.QueryTasks();

  return (
    <div className="text-tanj-green p-8 mx-10 w-full max-w-sm flex flex-col">
      <h4>Tasks: </h4>
      <div className="h-full overflow-auto ">
        {
          (tasks || []).map(
            task => <Task {...{task}} />
          )
        }
      </div>
    </div>
  )
}

function Task({task}: {task: ITask}) {
  const items = TasksAPI.QueryTaskItems({task_id:task._id});
  
  return (
    <Container className="my-4 relative p-2 pt-8 ">
        {/* <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-tr from-transparent border-2 border-yellow-400 to-yellow-600 opacity-5">
          
        </div> */}
        <div>
          {task.subject.name && <span className="text-xs absolute left-4 top-2">{task.subject.name}</span>}
          <TaskPriorityIcon priority={task.priority} className={'absolute right-3 top-3'} />
          {task.title && <h6>{task.title}</h6>}
          <p>{task.content}</p>
          <LoadingSpinner isLoading={items.isLoading} />
          {
            !items.isLoading && (
              (items.data||[]).length > 0 && 
              items.data!.sort((x,y) => {
                if (x.status === 'in progress' || x.status === 'pending')
                  return -1;
                else if (y.status === 'in progress' || y.status === 'pending')
                  return 1;
                return 0;
                }).map(item => <TaskItem task={item} />)
            )
          }
          <NewTaskItem parent_id={task._id} />
          {
            !items.isLoading && (
              !(items.data||[]).some(item => ['pending', 'in progress'].includes(item.status)) && 
              <TaskActions type={(items.data||[]).length ? "block" : "leaf"} {...{task}} />
            )
          }
          
      </div>
    </Container>
  )
}

function TaskPriorityIcon({priority, className}: {priority: number, className: string}) {
  
  if (priority === 3)
    return (
      <Priority.urgent className={className} />
    );

  if (priority === 2)
    return (
      <Priority.important className={className} />
    );

  if (priority === 1)
    return (
      <Priority.necessary className={className} />
    );

  if (priority === 0)
    return (
      <Priority.none className={className} />
    );

  return null
}

function NewTaskItem({parent_id}: {parent_id: string}) {
  const [newTask, setNewTask] = useState('');
  const insertTask = TasksAPI.InsertTask();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
    <div>
      <Button variant="discret" icon onClick={()=> setIsOpen(true)}>
        <Checkbox.doted className={`w-6`} />
      </Button>
    </div>
    )

  return (
    <div className='flex'>
      <div>
        <input value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button className='px-1.5 rounded border' onClick={() => { setNewTask(''); setIsOpen(false); }}>XX</button>
      </div>
      <button className='px-1.5 rounded border' 
        onClick={() => { 
          insertTask({
            content: newTask,
            parent_id
          }); 
          setNewTask('');
          setIsOpen(false);
          }
        } 
        disabled={newTask.trim() === ''}
      >send</button>
    </div>
  )
}

function TaskItem({task}: {task:ITask}) {
  return (
    <div className={`
      relative text-gray-200
      ${task.status === 'in progress' && 'text-amber-400'}
      ${task.status === 'completed' && 'text-gray-300 line-through opacity-70'}
      ${task.status === 'cancelled' && 'text-red-400 line-through opacity-70'}
    `}>
      <TaskIcon {...{task}} className="inline-block" />
      <span>{task.title || task.content}</span>
    </div>
  )
}

function TaskIcon({task, className}: {task: ITask, className?: string}) {
  const actOnTask = TasksAPI.ActOnTask();
  if (task.status === 'pending')
    return (
      <DropDownMenu>
        <DropDownTriggerOnClick>
          <button className="text-gray-250 hover:text-gray-150">
            <Checkbox.unchecked className={className} />
          </button>
        </DropDownTriggerOnClick>
        <DropDownMenuContent position="top" align="start">
          <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'in progress'})}}>Start</DropDownMenuItem>
          <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'completed'})}}>Check</DropDownMenuItem>
          <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'cancelled'})}}>Cancel</DropDownMenuItem>
        </DropDownMenuContent>
      </DropDownMenu>
    )
  else if (task.status === 'in progress')
    return (
      <DropDownMenu>
        <DropDownTriggerOnClick>
          <button className="text-gray-250 hover:text-gray-150">
            <Util.loading className={"animate-spin "+className} />
          </button>
        </DropDownTriggerOnClick>
        <DropDownMenuContent position="top" align="start">
          <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'completed'})}}>Finish</DropDownMenuItem>
          <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'cancelled'})}}>Cancel</DropDownMenuItem>
        </DropDownMenuContent>
      </DropDownMenu>
    )
  else if (task.status === 'cancelled')
    return (
      <Checkbox.canceled className={className} />
    )
  else if (task.status === 'completed')
    return (
      <Checkbox.checked className={className} />
    )
  else if (task.status === 'paused')
    return (
      <Checkbox.paused className={className} />
    )

  return null
}

function TaskActions({task, type}: {task:ITask, type: 'block'|'leaf'}) {
  const actOnTask = TasksAPI.ActOnTask();
  return (
    <div className="flex">
      {(task.status === 'pending' && type === 'leaf' ) && (
        <button onClick={() => {actOnTask({task_id: task._id, action: 'in progress'})}} className="px-1 rounded-sm border">start</button>
      )}
      {(task.status === 'in progress' || type === 'block') && (
        <button onClick={() => {actOnTask({task_id: task._id, action: 'completed'})}} className="px-1 rounded-sm border">finish</button>
      )}
      <DropDownMenu>
        <DropDownMenuTriggerOnClick>...</DropDownMenuTriggerOnClick>
        <DropDownMenuContent position="right" align="center">
          <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'cancelled'})}}>Cancel</DropDownMenuItem>
          {
            task.status === 'pending' && 
            <DropDownMenuItem onClick={() => {actOnTask({task_id: task._id, action: 'completed'})}}>Finish</DropDownMenuItem>
          }
        </DropDownMenuContent>
      </DropDownMenu>
    </div>
  )
}
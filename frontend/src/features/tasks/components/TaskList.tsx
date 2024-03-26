import { Container } from "@/components/structure/container";
import * as TasksAPI from "@/features/tasks/api";
import { ITask } from "shared-types";
import { LoadingSpinner } from "@/components/Loading";
import { useState } from "react";
import { DropDownMenu, DropDownMenuItem, DropDownMenuTrigger, DropDownMenuContent } from "@/components/dropdown";

export function TaskList() {
  const {data: tasks} = TasksAPI.QueryTasks();

  return (
    <div className="text-tanj-green p-8 mx-10 w-full max-w-sm flex flex-col">
      <h4>Tasks: </h4>
      <div className="h-full overflow-auto">
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
    <Container className="my-4 w-full pt-5 relative">
      {task.subject.name && <span className="text-xs absolute right-2 top-1">{task.subject.name}</span>}
      <span className="text-xs absolute left-2 top-1">{task.status}</span>
      {task.title && <h6>{task.title}</h6>}
      <p>{task.content}</p>
      <LoadingSpinner isLoading={items.isLoading} />
      {
        !items.isLoading && (
          <>
            {
              (items.data||[]).length > 0 && 
              items.data!.map(item => <TaskItem task={item} />)
            }
            {
              !(items.data||[]).some(item => ['pending', 'in progress'].includes(item.status)) && 
              <TaskActions type={(items.data||[]).length ? "block" : "leaf"} {...{task}} />
            } 
          </>
        )
      }
      <NewTaskItem parent_id={task._id} />
    </Container>
  )
}

function NewTaskItem({parent_id}: {parent_id: string}) {
  const [newTask, setNewTask] = useState('');
  const insertTask = TasksAPI.InsertTask();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (<div><button className="px-1.5 border rounded" onClick={()=> setIsOpen(true)}>+</button></div>)

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
    <Container className="my-4 w-full pt-5 relative">
      {task.subject.name && <span className="text-xs absolute right-2 top-1">{task.subject.name}</span>}
      <span className="text-xs absolute left-2 top-1">{task.status}</span>
      {
        task.title ? <h6>{task.title}</h6> : 
        <p>{task.content}</p>
      }
      <TaskActions type="leaf" {...{task}} />
    </Container>
  )
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
      {/* <DropDownOnClickButton main={<button className="px-1 ml-1 rounded-sm border">...</button>} position="top">
        <button onClick={() => {actOnTask({task_id: task._id, action: 'cancelled'})}}>cancel</button>
        {task.status === 'pending' && <button onClick={() => {actOnTask({task_id: task._id, action: 'completed'})}}>finish</button>}
      </DropDownOnClickButton> */}
      <DropDownMenu>
        <DropDownMenuTrigger>...</DropDownMenuTrigger>
        <DropDownMenuContent position="top">
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
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaCheck } from 'react-icons/fa';
import { BtnSecondary } from "@/components/Buttons";
import { useProjectContext } from "../store/ProjectContext";
import * as ProjectsAPI from '@/features/projects/api';
import { queryClient } from "@/App";
import { ProjectQueueNode } from "../types";

export function ProjectBody({ closeProjectHandler }: { closeProjectHandler?: () => void }) {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen bg-tanj-gray bg-opacity-90' style={{backdropFilter: 'blur(6px)'}}>
      <BtnSecondary bgLess
        className="absolute top-4 left-4"
        onClick={closeProjectHandler}
      >
        <HiArrowNarrowLeft />
      </BtnSecondary>
      <div className="flex flex-col items-center h-full">
        <Info />
        <TaskQueue />
      </div>
    </div>
  )
}

function Info() {
  const { project } = useProjectContext()!;
  
  const editInfo = ProjectsAPI.UpdateProjectInfo();
  const editProjectInfo = (field: string) => (e:React.FocusEvent) => {
    const target = e.target as HTMLElement;
    editInfo({project_id: project._id, [field]: target.innerText});
  }

  return (
    <div className="text-tanj-white my-24">
      <h3 contentEditable 
        onBlur={editProjectInfo('name')}
      >{project.name}</h3>
      <pre>
        <p contentEditable 
          onBlur={editProjectInfo('description')}
        >{project.description}</p>
      </pre>
    </div>
  )
}


function TaskQueue() {
  const { project } = useProjectContext()!;
  const taskQuery = ProjectsAPI.QueryCurrentProjectTask({project_id: project._id});
  const updateTask = ProjectsAPI.FinishCurrentProjectTask();

  if (taskQuery.isLoading)
    return <>Loading...</>

  if (taskQuery.error)
    return <>Something went wrong</>
  
  const task = taskQuery.data;

  if (!task)
    return null
  

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h4 className="text-white">Current Task:</h4>
        <BtnSecondary 
          onClick={() => {
            updateTask({ project_id: project._id }, { 
              onSuccess(nextTask) {
                queryClient.setQueryData<ProjectQueueNode|null>('project-task', (task) => {
                  if (task?.priority === 2) return null
                  return nextTask
                });
              }
            })
          }}
        >
          <FaCheck />
        </BtnSecondary>
      </div>
      <div className="text-xl text-white p-4 border border-tanj-green border-opacity-75 rounded-sm">
        {task.content}
      </div>
    </div>
  )
}

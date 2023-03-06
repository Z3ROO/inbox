import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaCheck } from 'react-icons/fa';
import { BtnSecondary } from "@/components/Buttons";
import { useProjectContext } from "../store/ProjectContext";
import { useMutation, useQuery } from "react-query";
import * as ProjectsAPI from '@/features/projects/api';
import { queryClient } from "@/App";
import { IProject, ProjectQueueNode } from "../types";
import { useState } from "react";

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
  
  const editInfo = useMutation(ProjectsAPI.updateProjectInfo, {
    onSuccess(updatedProject) {
      console.log(updatedProject)
      queryClient.setQueryData<IProject>('opened-project',updatedProject);
    }
  });

  const editProjectInfo = (field: string) => (e:React.FocusEvent) => {
    const target = e.target as Element;
    editInfo.mutate({project_id: project._id, [field]: target.textContent});
  }

  return (
    <div className="text-tanj-white my-24">
      <h3 contentEditable 
        onBlur={editProjectInfo('name')}
      >{project.name}</h3>
      <p contentEditable 
        onBlur={editProjectInfo('description')}
      >{project.description}</p>
    </div>
  )
}


function TaskQueue() {
  const { project } = useProjectContext()!;
  const taskQuery = useQuery('project-task', () => ProjectsAPI.getCurrentProjectTask({project_id: project._id}), {
    onSuccess(task) {
      console.log(task)
    },
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  const updateTask = useMutation(ProjectsAPI.finishCurrentProjectTaks);

  if (taskQuery.isLoading)
    return <>Loading...</>

  if (taskQuery.error)
    return <>Something went wrong</>
  
  const task = taskQuery.data;

  if (!task)
    return null
  

  return (
    <div className="flex">
      <div className="text-2xl text-white">
        {task.requirements}
      </div>
      <BtnSecondary 
        onClick={() => {
          updateTask.mutate({ project_id: project._id }, { 
            onSuccess(nextTask) {
              queryClient.setQueryData<ProjectQueueNode|null>('project-task', (task) => {
                if (task?.priority === 2) return null
                return nextTask
              })
            }})
        }}
      >
        <FaCheck />
      </BtnSecondary>
    </div>
  )
}

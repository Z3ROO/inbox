import { HiArrowNarrowLeft } from "react-icons/hi";
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
        <Queue />
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

function usePriorityQueue<T extends { priority: number, queued_at: Date }>() {
  const [queue, setQueue] = useState<T[]>([]);

  const enqueue = (node: T) => {
    setQueue(prevQueue => enqueueLogic(prevQueue, node));
  }

  const enqueueBatch = (nodes: T[]) => {
    console.log(nodes)
    setQueue(prevQueue => {
      nodes.forEach(node => {
        prevQueue = enqueueLogic(prevQueue, node);
      });
      console.log(prevQueue)
      return prevQueue;
    });
  }

  const dequeue = () => {
    setQueue(prevQueue => {
      return prevQueue.slice(1)
    })
  }

  const clean = () => {
    setQueue([]);
  }

  function enqueueLogic(currentQueue: T[], node: T) {
    if (currentQueue.length === 0)
      return [node];

    for (let i = 0; i < currentQueue.length; i++) {
      const queueNode = currentQueue[i];
      let found = false;
      if (queueNode.priority === node.priority) {
        if (node.queued_at.getDate() > queueNode.queued_at.getDate())
          found = true;
      }
      else if (queueNode.priority > node.priority) {
        found = true 
      }
      else if (i === currentQueue.length-1) {
        i++;
        found = true;
      }


      if (found) {
        const firstHalf = currentQueue.slice(0,i);
        const secondHalf = currentQueue.slice(i);
        return [...firstHalf, node ,...secondHalf];
      }
    }
    
    return currentQueue
  }

  return {
    queue,
    enqueue,
    enqueueBatch,
    dequeue,
    clean
  }
}

function Queue() {
  const { project } = useProjectContext()!;
  const { queue, enqueue, dequeue, enqueueBatch, clean } = usePriorityQueue<ProjectQueueNode>();
  const queueQuery = useQuery('project-queue', () => ProjectsAPI.getProjectQueue({project_id: project._id}), {
    onSuccess(queue) {
      console.log(queue)
      enqueueBatch(queue)
    },
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  return (
    <div>
      {
        queue.length && 
          (
            <div className="text-2xl text-white">
              {queue[0].requirements}
            </div>
          )
      }
    </div>
  )
}

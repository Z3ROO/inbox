import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { ProjectQueueNode } from "../types";

type GetCurrentProjectTaskDTO = { project_id: string }

async function getCurrentProjectTask({ project_id }: GetCurrentProjectTaskDTO): Promise<ProjectQueueNode|null>{
  const request = await fetch(`${API_URL}/projects/task/${project_id}`); 
  const response = await request.json();

  return response;
}

export function QueryCurrentProjectTask({ project_id }: GetCurrentProjectTaskDTO, options?: QueryOptions<ProjectQueueNode|null, 'project-task'>) {
  return useQuery('project-task', () => getCurrentProjectTask({project_id}), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    ...options
  });
}



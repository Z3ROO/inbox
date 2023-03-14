import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";
import { ProjectQueueNode } from "../types";

type FinishCurrentProjectTaskDTO = { project_id: string }

async function finishCurrentProjectTask({ project_id }: FinishCurrentProjectTaskDTO ): Promise<ProjectQueueNode|null> {
  const request = await fetch(`${API_URL}/projects/task/${project_id}`, { method: 'delete' }); 
  const response = await request.json();
  return response;
}

export function FinishCurrentProjectTask(options?: MutationOptions<ProjectQueueNode|null, FinishCurrentProjectTaskDTO>) {
  return useMutation(finishCurrentProjectTask, options);
}


import { useMutation } from "@/lib/query";
import { CompleteTaskDTO, CompleteTaskResponse } from "../types";
import { MutationOptions } from "@/lib/query";
import { API_URL } from "@/config/API";

async function completeTask(args: CompleteTaskDTO): Promise<CompleteTaskResponse> {
  const { task_id, goal_id } = args;

  // const request = await fetch(`${API_URL}/goals/task`, {
  //   method: 'PUT',
  //   body: JSON.stringify({
  //     task_id, goal_id
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=utf-8'
  //   }
  // })

  return {
    task_id:"tananan",
    currentState: true
  };
}

export function CompleteTask(options?: MutationOptions<CompleteTaskResponse, CompleteTaskDTO>) {
  return useMutation(completeTask, {
    ...options
  })
}
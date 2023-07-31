import { useMutation } from "@/lib/query";
import { CompleteTaskDTO, CompleteTaskResponse } from "../types";
import { MutationOptions } from "@/lib/query";
import { API_URL } from "@/config/API";

async function completeTask(args: CompleteTaskDTO): Promise<CompleteTaskResponse> {
  const { task_id, goal_id, state } = args;

  const request = await fetch(`${API_URL}/goals/task/complete`, {
    method: 'PUT',
    body: JSON.stringify({
      task_id, goal_id, state
    }),
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    }
  });

  const response = await request.json();

  console.log('Lidar com essa resposta depois de padronizar respostas do servidor');

  return response
}

export function CompleteTask(options?: MutationOptions<CompleteTaskResponse, CompleteTaskDTO>) {
  return useMutation(completeTask, {
    ...options
  })
}
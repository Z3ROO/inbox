import { queryClient } from "@/App";
import APIRequest from "@/lib/ApiRequest";
import { MutationOptions, useMutation } from "@/lib/query";
import { ActOnTaskDTO } from "shared-types";

async function actOnTask(args: ActOnTaskDTO) {
  const response = await APIRequest(`/tasks/action`, {
    method:'post',
    body: args
  });

  return response.data
}

export function ActOnTask(options?:MutationOptions<null, ActOnTaskDTO>) {
  return useMutation(actOnTask, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('task-items');
    }
  });
}
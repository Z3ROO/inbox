import { queryClient } from "@/App";
import APIRequest from "@/lib/ApiRequest";
import { MutationOptions, useMutation } from "@/lib/query";
import { InsertTaskDTO } from "shared-types";

async function insertTask(args: InsertTaskDTO) {
  const res = await APIRequest<null, InsertTaskDTO>(`/tasks`, {
    method: 'post',
    body: args
  });

  return res.data;
}

export function InsertTask(options?: MutationOptions<null, InsertTaskDTO>) {
  return useMutation(insertTask, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('task-items');
    }
  });
}
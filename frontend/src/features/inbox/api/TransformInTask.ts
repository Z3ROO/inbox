import { queryClient } from "@/App";
import APIRequest from "@/lib/ApiRequest";
import { MutationOptions, useMutation } from "@/lib/query";
import { TransformDraftToTaskDTO } from "shared-types";

async function transformInTask({draft_id}: TransformDraftToTaskDTO) {
  const response = await APIRequest(`/drafts/to-task/${draft_id}`);
  
  return response.data;
}

export function TransformInTask(options?: MutationOptions<null, TransformDraftToTaskDTO>) {
  return useMutation(transformInTask, { ...options,
  onSuccess: () => {
    queryClient.invalidateQueries('inbox')
  } });
}
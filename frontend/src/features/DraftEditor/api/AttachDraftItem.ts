import { queryClient } from "@/App";
import APIRequest from "@/lib/ApiRequest";
import { MutationOptions, useMutation } from "@/lib/query";
import { AttachDraftItemDTO } from "shared-types";

async function attachDraftItem(args: AttachDraftItemDTO) {
  const response = await APIRequest<null, AttachDraftItemDTO>(`/drafts/items/attach`, {
    method: 'post',
    body: args
  });

  return response.data;
}

export function AttachDraftItem(options?: MutationOptions<null, AttachDraftItemDTO>) {
  return useMutation(attachDraftItem, {
    ...options,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('draft-items');
    }
  })
}
import { queryClient } from "@/App";
import APIRequest from "@/lib/ApiRequest";
import { MutationOptions, useMutation } from "@/lib/query";
import { DeleteDraftItemDTO } from "shared-types";

async function detachDraftItem(args: DeleteDraftItemDTO) {
  const response = await APIRequest<null, DeleteDraftItemDTO>(`/drafts/items`, {
    method: 'delete',
    body: args
  });

  return response.data;
}

export function DetachDraftItem(options?: MutationOptions<null, DeleteDraftItemDTO>) {
  return useMutation(detachDraftItem, { 
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries('draft-items');
    }
  });
}
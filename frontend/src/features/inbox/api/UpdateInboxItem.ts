import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";
import { IInboxItem, InboxItemDTO } from "../types";


async function updateInboxItem(args: InboxItemDTO): Promise<{}> {
  const { content, inboxItem_id, action } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'put',
    body: JSON.stringify({content, action, item_id: inboxItem_id}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

export function UpdateInboxItem(options?: MutationOptions<{}, InboxItemDTO>) {

  return useMutation(updateInboxItem, {
    ...options,
    onSuccess: (_, variables) => {

      queryClient.invalidateQueries('inbox-todos');
      queryClient.invalidateQueries('inbox-items');
    }
  });
}



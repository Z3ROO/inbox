import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";
import { IInboxItem } from "../types";

type UpdateInboxArguments = {content?: string, inboxItem_id: string, action: 'day'|'week'|'month'|'3months'|'remove'|'undo'};

async function updateInboxItem(args: UpdateInboxArguments): Promise<{}> {
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

export function UpdateInboxItem(options?: MutationOptions<{}, UpdateInboxArguments>) {

  return useMutation(updateInboxItem, {
    ...options,
    onSuccess: (_, variables) => {
      const { action } = variables;

      if (action !== 'undo') {
        queryClient.setQueryData<IInboxItem[]>('inbox-items', (data) => (data||[]).slice(1));
      }
      else
        queryClient.invalidateQueries('inbox-items');
    }
  });
}



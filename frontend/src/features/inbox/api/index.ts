import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { IInboxItem } from "@/features/inbox/types";
import { useMutation, useQuery, UseQueryOptions, UseMutationOptions, QueryKey } from "react-query";

type QueryOptions<T, K extends QueryKey = QueryKey> = Omit<UseQueryOptions<T, unknown, T, K>, 'queryKey' | 'queryFn'>
type MutationOptions<TData, TVariables> = Omit<UseMutationOptions<TData, unknown, TVariables, unknown>, 'mutationKey' | 'mutationFn'>

export async function getInboxItems(): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/inbox`);
  const response = await request.json();

  return response;
}
export function QueryInboxItems(config?: {
  options?: QueryOptions<IInboxItem[], 'inbox-items'> 
}) {
  return useQuery('inbox-items', getInboxItems, { ...config?.options });
}

export async function insertInboxItem(args: {content: string}) {
  const { content } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'post',
    body: JSON.stringify({content}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}
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
export function UpdateInboxItem(config?: {
  options?: MutationOptions<{}, UpdateInboxArguments>
}) {

  return useMutation(updateInboxItem, {
    ...config?.options,
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

export async function attachToProject(args: { project_id: string, inboxItem_id: string }) {
  const { project_id, inboxItem_id } = args;

  const request = await fetch(`${API_URL}/inbox/attach-project`, {
    method: 'put',
    body: JSON.stringify({project_id, inboxItem_id}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();
  console.log(response)
}

export async function enqueueInboxItem(args: { inboxItem_id: string, priority: number }) {
  const { inboxItem_id, priority } = args;

  const request = await fetch(`${API_URL}/inbox/enqueue`, {
    method: 'put',
    body: JSON.stringify({ inboxItem_id, priority }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();
}


import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";

type EnqueueInboxItemArguments = { inboxItem_id: string, priority: number }

async function enqueueInboxItem(args: EnqueueInboxItemArguments) {
  const { inboxItem_id, priority } = args;

  const request = await fetch(`${API_URL}/inbox/enqueue`, {
    method: 'put',
    body: JSON.stringify({ inboxItem_id, priority }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();
  
  return response;
}

export function EnqueueInboxItem(options?: MutationOptions<{}, EnqueueInboxItemArguments>) {
  return useMutation(enqueueInboxItem, {
    ...options
  });
}

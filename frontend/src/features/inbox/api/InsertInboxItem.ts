import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";

type InsertInboxItemArguments = {content: string}

async function insertInboxItem(args: InsertInboxItemArguments) {
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

export function InsertInboxItem(options?: MutationOptions<{}, InsertInboxItemArguments>) {
  return useMutation(insertInboxItem, {
    ...options,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('inbox-items');
    }
  });
}


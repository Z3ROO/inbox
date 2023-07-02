import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";

type InsertDraftArguments = {content: string}

async function insertDraft(args: InsertDraftArguments) {
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

export function InsertDraft(options?: MutationOptions<{}, InsertDraftArguments>) {
  return useMutation(insertDraft, {
    ...options,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('inbox');
    }
  });
}


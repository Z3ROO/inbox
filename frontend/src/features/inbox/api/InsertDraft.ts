import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";

type InsertDraftArguments = {
  content: string,
  priority?: number,
  category?: string|null,
  to_deal?: boolean
}

async function insertDraft(args: InsertDraftArguments) {
  const { content, priority, category, to_deal } = args;
  
  const request = await fetch(`${API_URL}/drafts/insert`, {
    method: 'post',
    body: JSON.stringify({ 
      content,
      priority: priority ?? 0,
      category: category ?? null,
      to_deal
    }),
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
      if (variables.to_deal)
        queryClient.invalidateQueries('inbox-toDeals');
    }
  });
}


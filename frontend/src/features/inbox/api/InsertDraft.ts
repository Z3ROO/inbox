import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";

type InsertDraftArguments = {
  content: string,
  priority?: number,
  category?: string|null,
  todo?: boolean
}

async function insertDraft(args: InsertDraftArguments) {
  const { content, priority, category, todo } = args;
  
  const request = await fetch(`${API_URL}/drafts/insert`, {
    method: 'post',
    body: JSON.stringify({ 
      content,
      priority: priority ?? 0,
      category: category ?? null,
      todo
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
      if (variables.todo)
        queryClient.invalidateQueries('inbox-todos');
    }
  });
}


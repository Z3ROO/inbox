import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";
import { DraftUpdateDTO } from "../types";


async function updateDraft(args: DraftUpdateDTO): Promise<{}> {
  const { content, draft_id, action, quantity, priority, category } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'put',
    body: JSON.stringify({content, action, quantity, draft_id: draft_id, priority, category}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

export function UpdateDraft(options?: MutationOptions<{}, DraftUpdateDTO>) {

  return useMutation(updateDraft, {
    ...options,
    onSuccess: (_, variables) => {

      queryClient.invalidateQueries('inbox-todos');
      queryClient.invalidateQueries('inbox');
    }
  });
}



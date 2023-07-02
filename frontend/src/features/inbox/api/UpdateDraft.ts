import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";
import { DraftDTO } from "../types";


async function updateDraft(args: DraftDTO): Promise<{}> {
  const { content, draft_id, action, quantity } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'put',
    body: JSON.stringify({content, action, quantity, draft_id: draft_id}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

export function UpdateDraft(options?: MutationOptions<{}, DraftDTO>) {

  return useMutation(updateDraft, {
    ...options,
    onSuccess: (_, variables) => {

      queryClient.invalidateQueries('inbox-todos');
      queryClient.invalidateQueries('inbox');
    }
  });
}



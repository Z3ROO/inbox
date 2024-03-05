import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";
import { DraftUpdateDTO } from "../types";

/**
 * #### Updates draft properties based on an specified action.
 * 
 * @param args.draft_id - Draft unique identifier.
 * @param args.content - Draft's text content.
 * @param args.action - Specific action to be taken in the server-side.
 * @param quantity - Used along with delay type actions, specifies a quantity of delay
 * @param priority - Updated draft's priority.
 * @param category - Updated draft's category.
 * @returns - !!! TO BE STANDARDIZED !!!
 */

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
      queryClient.invalidateQueries('inbox-toDeals');
      queryClient.invalidateQueries('inbox');
    }
  });
}



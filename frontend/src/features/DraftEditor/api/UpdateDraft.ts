import { queryClient } from "@/App";
import { useMutation, MutationOptions } from "@/lib/query";
import { DraftUpdateDTO } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";

/**
 * #### Updates draft properties based on an specified action.
 * 
 * @param args.draft_id - Draft unique identifier.
 * @param args.content - Draft's text content.
 * @param args.action - Specific action to be taken in the server-side.
 * @param quantity - Used along with delay type actions, specifies a quantity of delay
 * @param priority - Updated draft's priority.
 * @param subject - Updated draft's subject.
 * @returns - !!! TO BE STANDARDIZED !!!
 */

async function updateDraft(args: DraftUpdateDTO) {
  const { title, content, draft_id, action, quantity, priority, subject } = args;

  const response = await APIRequest<null, DraftUpdateDTO>(`/inbox`, {
    method: 'put',
    body: {
      title,
      content,
      draft_id,
      action,
      quantity,
      priority,
      subject
    }
  })

  return response.data;
}

export function UpdateDraft(options?: MutationOptions<null, DraftUpdateDTO>) {

  return useMutation(updateDraft, {
    ...options,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries('inbox-toDeals');
      queryClient.invalidateQueries('inbox');
    }
  });
}



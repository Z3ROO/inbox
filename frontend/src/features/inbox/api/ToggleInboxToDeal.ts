import { queryClient } from "@/App";
import { useMutation, MutationOptions } from "@/lib/query";
import { ToggleToDealDTO } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";


async function toggleInboxTodo(args: ToggleToDealDTO) {
  const { draft_id, state } = args;

  const response = await APIRequest<null, ToggleToDealDTO>(
    `/to_deal/toggle`, {
      method: 'put',
      body: {
        draft_id,
        state
      }
    }
  );

  return response.data;
}

export function ToggleInboxTodo(options?: MutationOptions<null, ToggleToDealDTO>) {

  return useMutation(toggleInboxTodo, {
    ...options,
    onSuccess: (_, variables) => {
      // MUST CONFIGURE A MORE PRECISE UPDATE OF THE WHOLE ITEMS LIST
      //queryClient.setQueryData<IInboxItem[]>('inbox-items', (data) => (data||[]).slice(1));
      queryClient.invalidateQueries('inbox');
      queryClient.invalidateQueries('inbox-toDeals');
    }
  });
}



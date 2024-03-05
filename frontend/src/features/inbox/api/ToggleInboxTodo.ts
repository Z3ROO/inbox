import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";
import { ToggleTodoDTO } from "../types";


async function toggleInboxTodo(args: ToggleTodoDTO): Promise<{}> {
  const { draft_id, state } = args;
  
  const request = await fetch(`${API_URL}/to_deal/toggle`, {
    method: 'put',
    body: JSON.stringify({ draft_id, state }),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

export function ToggleInboxTodo(options?: MutationOptions<{}, ToggleTodoDTO>) {

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



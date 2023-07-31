import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";
import { FocusGoalDTO } from "../types";
import { queryClient } from "@/App";

async function focusGoal(args: FocusGoalDTO): Promise<{}> {
  const {goal_id, focus} = args;
  const action = focus === false ? 'unfocus' : 'focus';
  
  const request = await fetch(`${API_URL}/goals/${action}/${goal_id}`);
  const response = await request.json();

  return {}
}

export function FocusGoal(options?: MutationOptions<{}, FocusGoalDTO>) {
  return useMutation(focusGoal, {
    ...options,
    onSuccess() {
      queryClient.invalidateQueries('ActiveGoals');
      queryClient.invalidateQueries('QueuedGoals');
    }
  })
}
import { API_URL } from "@/config/API";
import { ActivateGoalDTO } from "../types";
import { MutationOptions, useMutation } from "@/lib/query";
import { queryClient } from "@/App";

async function activateGoal(args: ActivateGoalDTO): Promise<{}> {
  const { goal_id, activate } = args;
  const action = activate === false ? 'deactivate' : 'activate';

  const request = await fetch(`${API_URL}/goals/${action}/${goal_id}`);
  const response = await request.json();

  return {}
}

export function ActivateGoal(options?: MutationOptions<{}, ActivateGoalDTO>) {
  return useMutation(activateGoal, {
    ...options,
    onSuccess() {
      queryClient.invalidateQueries('ActiveGoals');
      queryClient.invalidateQueries('QueuedGoals');
    }
  })
}
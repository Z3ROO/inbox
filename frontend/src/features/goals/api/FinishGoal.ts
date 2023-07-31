import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";

async function finishGoal({goal_id}: {goal_id: string}) {
  const request = await fetch(`${API_URL}/goals/finish/${goal_id}`);
  const response = await request.json();

  return {}
}

export function FinsihGoal(options?: MutationOptions<{}, {goal_id: string}>) {
  return useMutation(finishGoal, {
    ...options,
    onSuccess() {
      queryClient.invalidateQueries('ActiveGoals');
      queryClient.invalidateQueries('QueuedGoals');
    }
  });
}
import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";

async function deleteGoal({goal_id}: { goal_id: string }) {
  const request = await fetch(`${API_URL}/goals/${goal_id}`, {
    method: 'delete'
  });
  const response = await request.json();

  return {}
}

export function DeleteGoal(options?: MutationOptions<{}, {goal_id: string}>) {
  return useMutation(deleteGoal, {
    ...options,
    onSuccess() {
      queryClient.invalidateQueries('ActiveGoals');
      queryClient.invalidateQueries('QueuedGoals');
    }
  });
}
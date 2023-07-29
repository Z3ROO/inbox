import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";
import { FocusGoalDTO } from "../types";

async function focusGoal(args: FocusGoalDTO): Promise<{}> {
  const {goal_id, focus} = args;
  const action = focus === false ? 'unfocus' : 'focus';
  
  // const request = await fetch(`${API_URL}/goal/focus/${action}/${goal_id}`);
  // const response = await request.json();

  return {}
}

export function FocusGoal(options?: MutationOptions<{}, FocusGoalDTO>) {
  return useMutation(focusGoal, {
    ...options
  })
}
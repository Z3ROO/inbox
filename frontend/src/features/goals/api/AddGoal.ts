import { API_URL } from "@/config/API";
import { AddGoalDTO, IGoal } from "../types";
import { MutationOptions, useMutation } from "@/lib/query";

async function addGoal(args: AddGoalDTO): Promise<{}> {
  // const request = await fetch(`${API_URL}/goals/add`, {
  //   method: 'post',
  //   body: JSON.stringify({
  //     ...args
  //   }),
  //   headers:{
  //     'Content-type': 'application/json; charset=utf-8'
  //   }
  // });

  // const response = await request.json();

  return {}
}

export function AddGoal(options?: MutationOptions<{}, AddGoalDTO>) {
  return useMutation(addGoal, {
    ...options
  })
}
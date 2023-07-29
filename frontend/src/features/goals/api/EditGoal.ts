import { API_URL } from "@/config/API";
import { EditGoalDTO } from "../types";
import { MutationOptions, useMutation } from "@/lib/query";

async function editGoal(args: EditGoalDTO): Promise<{}> {
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
  console.log(args)
  return {}
}

export function EditGoal(options?: MutationOptions<{}, EditGoalDTO>) {
  return useMutation(editGoal, {
    ...options
  })
}
import { API_URL } from "@/config/API";
import { IGoal } from "../types";
import { useQuery } from "react-query";
import { QueryOptions } from "@/lib/query";

async function getAwaitingGoals(): Promise<IGoal[]> {
  // const request = await fetch(`${API_URL}/goals/awaiting`);
  // const response = await request.json();

  // return response;

  return [{ 
    _id: '',
    title: 'Goal title', 
    description: 'Description of this goal that summarizes basically what I want to do.', 
    tasks: [
      { _id: '', description: 'Description of a task 1', complete: false },
      { _id: '', description: 'Description of a task 2', complete: false },
      { _id: '', description: 'Description of a task 3', complete: true }
    ]
  }]
}

export function QueryAwaitingGoals(options?: QueryOptions<IGoal[], 'AwaitingGoals'>) {
  return useQuery('AwaitingGoals', getAwaitingGoals, { ...options });
}
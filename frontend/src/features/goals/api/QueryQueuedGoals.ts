import { API_URL } from "@/config/API";
import { IGoal } from "../types";
import { useQuery } from "react-query";
import { QueryOptions } from "@/lib/query";

async function getQueuedGoals(): Promise<IGoal[]> {
  // const request = await fetch(`${API_URL}/goals/queued`);
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

export function QueryQueuedGoals(options?: QueryOptions<IGoal[], 'QueuedGoals'>) {
  return useQuery('QueuedGoals', getQueuedGoals, { ...options });
}
import { API_URL } from "@/config/API";
import { IGoal } from "../types";
import { useQuery } from "react-query";
import { QueryOptions } from "@/lib/query";

async function getGoals(): Promise<IGoal[]> {
  // const request = await fetch(`${API_URL}/goals`);
  // const response = await request.json();
  
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

  // return response;
}

export function QueryGoals(config?: { options?: QueryOptions<IGoal[], 'goals'>}) {
  return useQuery('goals', getGoals, { ...config?.options });
}
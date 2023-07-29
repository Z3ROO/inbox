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
    active: true,
    focused: true,
    position: 0,
    finished: false,
    created_at: new Date(),
    finished_at: null,
    tasks: [
      { _id: '', description: 'Description of a task 1', complete: true },
      { _id: '', description: 'Description of a task 2', complete: false },
      { _id: '', description: 'Description of a task 3', complete: false }
    ]
  }]

  // return response;
}

export function QueryGoals(options?: QueryOptions<IGoal[], 'ActiveGoals'>) {
  return useQuery('ActiveGoals', getGoals, { ...options });
}
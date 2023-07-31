import { API_URL } from "@/config/API";
import { IGoal } from "../types";
import { useQuery } from "react-query";
import { QueryOptions } from "@/lib/query";

async function getActiveGoals(): Promise<IGoal[]> {
  const request = await fetch(`${API_URL}/goals/active`);
  const response = await request.json();

  return response;
}

export function QueryActiveGoals(options?: QueryOptions<IGoal[], 'ActiveGoals'>) {
  return useQuery('ActiveGoals', getActiveGoals, { ...options });
}
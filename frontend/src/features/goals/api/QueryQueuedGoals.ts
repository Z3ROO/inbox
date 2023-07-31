import { API_URL } from "@/config/API";
import { IGoal } from "../types";
import { useQuery } from "react-query";
import { QueryOptions } from "@/lib/query";

async function getQueuedGoals(): Promise<IGoal[]> {
  const request = await fetch(`${API_URL}/goals/queued`);
  const response = await request.json();

  return response;
}

export function QueryQueuedGoals(options?: QueryOptions<IGoal[], 'QueuedGoals'>) {
  return useQuery('QueuedGoals', getQueuedGoals, { ...options });
}
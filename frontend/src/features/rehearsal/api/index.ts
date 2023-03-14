import { RehearsalOptions } from "../types";
import { API_URL } from "@/config/API";

export * from './QueryRehearsalDecks';
export * from './EvaluateCard';
export * from './RemoveCard';
export * from './InsertCard';

export async function getRehearsalOptions(): Promise<RehearsalOptions> {
  const request = await fetch(API_URL+'/rehearsal/meta');
  const response = request.json();

  return response;
}


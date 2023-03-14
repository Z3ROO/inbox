import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { RehearsalByType } from "../types";

async function getRehearsalDecks(): Promise<RehearsalByType[]> {
  const request = await fetch(API_URL+'/rehearsal');
  const response = request.json();

  return response;
}

export function QueryRehearsalDecks(options?: QueryOptions<RehearsalByType[], 'rehearsal'> ) {
  
  return useQuery('rehearsal', getRehearsalDecks, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...options
  });
}


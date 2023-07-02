import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query/query";
import { useQuery } from "react-query";
import { IDraft } from "../types";


async function getInbox(): Promise<IDraft[]> {
  const request = await fetch(`${API_URL}/inbox`);
  const response = await request.json();

  return response;
}

export function QueryInbox(config?: {
  options?: QueryOptions<IDraft[], 'inbox'> 
}) {
  return useQuery('inbox', getInbox, { ...config?.options });
}


import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query/query";
import { useQuery } from "react-query";
import { IInboxItem } from "../types";


export async function getInboxItems(): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/inbox`);
  const response = await request.json();

  return response;
}

export function QueryInboxItems(config?: {
  options?: QueryOptions<IInboxItem[], 'inbox-items'> 
}) {
  return useQuery('inbox-items', getInboxItems, { ...config?.options });
}


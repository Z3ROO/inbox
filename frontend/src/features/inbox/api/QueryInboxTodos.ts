import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "../types";

async function getInboxToDeals(): Promise<IDraft[]> {
  const request = await fetch(`${API_URL}/to_deal`);
  const response = await request.json();

  return response;
}

export function QueryInboxToDeals(config?: {
  options?: QueryOptions<IDraft[], 'inbox-toDeals'>
}) {
  return useQuery('inbox-toDeals', getInboxToDeals, {...config?.options });
}

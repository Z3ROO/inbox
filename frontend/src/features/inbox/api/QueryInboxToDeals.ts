import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";

async function getInboxToDeals(): Promise<IDraft[]> {
  const response = await APIRequest<IDraft[]>(`/to_deal`)

  return response.data;
}

export function QueryInboxToDeals(config?: {
  options?: QueryOptions<IDraft[], 'inbox-toDeals'>
}) {
  return useQuery('inbox-toDeals', getInboxToDeals, {...config?.options });
}

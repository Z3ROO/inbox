import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";

async function getToDeals(): Promise<IDraft[]> {
  const response = await APIRequest<IDraft[]>(`/to_deal`)

  return response.data;
}

export function QueryToDeals(config?: {
  options?: QueryOptions<IDraft[], 'inbox-toDeals'>
}) {
  return useQuery('inbox-toDeals', getToDeals, {...config?.options });
}

import { QueryOptions } from "@/lib/query/query";
import { useQuery } from "react-query";
import { IDraft } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";


async function getInbox() {
  const response = await APIRequest<IDraft[]>(`/inbox`);

  return response.data;
}

export function QueryInbox(config?: {
  options?: QueryOptions<IDraft[], 'inbox'> 
}) {
  return useQuery('inbox', getInbox, { ...config?.options });
}


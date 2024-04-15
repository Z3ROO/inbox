import APIRequest from "@/lib/ApiRequest";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "shared-types";

async function getDraftItems(draft_id: string) {
  const response = await APIRequest<IDraft[]>(`/drafts/items/${draft_id}`);
  return response.data;
}

export function QueryDraftItems(config: {
  draft_id: string
  options?: QueryOptions<IDraft[], ['draft-items', string]>
}) {
  return useQuery(['draft-items', config.draft_id],() => getDraftItems(config.draft_id), {...config?.options})
}
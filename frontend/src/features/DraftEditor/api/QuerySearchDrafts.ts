import APIRequest from "@/lib/ApiRequest";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "shared-types";

async function getSearchDrafts(search: string) {
  search = encodeURIComponent(search);

  const response = await APIRequest<IDraft[]>(`/drafts/search?s=${search}`);

  return response.data;
}

export function SearchDrafts(config: {search: string, options?: QueryOptions<IDraft[], ['search-drafts', string]>}) {
  return useQuery(['search-drafts', config.search], () => getSearchDrafts(config.search), { ...config.options });
}
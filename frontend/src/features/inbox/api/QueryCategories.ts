import { QueryOptions } from "@/lib/query/query";
import { useQuery } from "react-query";
import { IDraftCategory } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";


async function getCategories() {
  const response = await APIRequest<IDraftCategory[]>(`/draft_categories`);

  return response.data;
}

export function QueryCategories(config?: {
  options?: QueryOptions<IDraftCategory[], 'draft_categories'> 
}) {
  return useQuery('draft_categories', getCategories, { ...config?.options });
}


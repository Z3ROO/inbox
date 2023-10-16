import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query/query";
import { useQuery } from "react-query";
import { IDraftCategory } from "../types";


async function getCategories(): Promise<IDraftCategory[]> {
  const request = await fetch(`${API_URL}/inbox/categories`);
  const response = await request.json();

  return response;
}

export function QueryCategories(config?: {
  options?: QueryOptions<IDraftCategory[], 'draft_categories'> 
}) {
  return useQuery('draft_categories', getCategories, { ...config?.options });
}


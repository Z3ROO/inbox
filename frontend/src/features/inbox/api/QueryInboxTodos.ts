import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IDraft } from "../types";

async function getInboxTodos(): Promise<IDraft[]> {
  const request = await fetch(`${API_URL}/to_deal`);
  const response = await request.json();

  return response;
}

export function QueryInboxTodos(config?: {
  options?: QueryOptions<IDraft[], 'inbox-todos'>
}) {
  return useQuery('inbox-todos', getInboxTodos, {...config?.options });
}

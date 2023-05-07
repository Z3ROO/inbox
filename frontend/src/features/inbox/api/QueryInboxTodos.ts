import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IInboxItem } from "../types";

async function getInboxTodos(): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/inbox/todos`);
  const response = await request.json();

  return response;
}

export function QueryInboxTodos(config?: {
  options?: QueryOptions<IInboxItem[], 'inbox-todos'>
}) {
  return useQuery('inbox-todos', getInboxTodos, {...config?.options });
}

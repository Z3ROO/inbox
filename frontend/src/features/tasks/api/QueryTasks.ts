import APIRequest from "@/lib/ApiRequest";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { ITask } from "shared-types";

async function GetTasks() {
  const response = await APIRequest<ITask[]>(`/tasks`);
  return response.data;
}

export function QueryTasks(config?: { options?: QueryOptions<ITask[], 'tasks'>}) {
  return useQuery('tasks', GetTasks, { ...config?.options });
}
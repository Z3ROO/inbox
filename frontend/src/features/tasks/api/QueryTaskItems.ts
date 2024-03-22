import APIRequest from "@/lib/ApiRequest";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { ITask } from "shared-types";

async function getTaskItems(task_id: string) {
  const response = await APIRequest<ITask[]>(`/tasks/items/${task_id}`);
  return response.data;
  // const mock: ITask[] = [
  //   {
  //     _id: '123123123',
  //     content: 'rwerwerwer',
  //     priority: 1,
  //     subject: {
  //       _id: '123123',
  //       color: '',
  //       icon: '',
  //       name: 'TesteSubject'
  //     },
  //     title: '',
  //     created_at: new Date(),
  //     started_at: null,
  //     ended_at: null,
  //     status: 'pending'
  //   }
  // ]
  // return mock;
}

export function QueryTaskItems(config: {
  task_id: string
  options?: QueryOptions<ITask[], ['task-items', string]>
}) {
  return useQuery(['task-items', config.task_id],() => getTaskItems(config.task_id), {...config?.options})
}
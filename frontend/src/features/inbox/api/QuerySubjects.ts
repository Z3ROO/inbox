import { QueryOptions } from "@/lib/query/query";
import { useQuery } from "react-query";
import { ISubject } from "shared-types";
import APIRequest from "../../../lib/ApiRequest";


async function getSubjects() {
  const response = await APIRequest<ISubject[]>(`/subjects`);

  return response.data;
}
console.log('Dry these keys')
export function QuerySubjects(config?: {
  options?: QueryOptions<ISubject[], 'subjects'> 
}) {
  return useQuery('subjects', getSubjects, { ...config?.options });
}


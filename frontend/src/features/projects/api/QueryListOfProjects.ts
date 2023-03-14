import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { ListOfProjects } from "../types";

async function getListOfProjects(): Promise<ListOfProjects> {
  const request = await fetch(`${API_URL}/projects`);
  const response = await request.json();

  return response;
}

export function QueryListOfProjects(options?: QueryOptions<ListOfProjects, 'project-list'>) {
  return useQuery('project-list', getListOfProjects, options);
}


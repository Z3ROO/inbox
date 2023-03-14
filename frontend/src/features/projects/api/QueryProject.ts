import { API_URL } from "@/config/API";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";
import { IProject } from "../types";

type GetProjectDTO = { project_id: string }

async function getProject({ project_id }: GetProjectDTO ): Promise<IProject> {
  const request = await fetch(`${API_URL}/projects/project/${project_id}`);
  const response = await request.json();

  return response
}

export function QueryProject({ project_id }: GetProjectDTO, options?: QueryOptions<IProject, 'opened-project'>) {
  return useQuery('opened-project', () => getProject({project_id}), options);
}


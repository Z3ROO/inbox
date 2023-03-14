import { API_URL } from "@/config/API";
import { IInboxItem } from "@/features/inbox/types";
import { QueryOptions } from "@/lib/query";
import { useQuery } from "react-query";

type GetProjectInboxDTO = { project_id: string }

async function getProjectInbox({ project_id }: GetProjectInboxDTO): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/projects/inbox/${project_id}`); 
  const response = await request.json();
  return response;
}

export function QueryProjectInbox({ project_id }: GetProjectInboxDTO, options?: QueryOptions<IInboxItem[], 'project-inbox'>) {
  return useQuery('project-inbox', () => getProjectInbox({project_id}), options);
}


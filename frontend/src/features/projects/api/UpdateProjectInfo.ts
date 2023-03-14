import { queryClient } from "@/App";
import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";
import { IProject, ProjectUpdatableFields } from "../types";

interface UpdateProjectDTO extends Partial<ProjectUpdatableFields> {
  project_id: string
}

async function updateProjectInfo(args: UpdateProjectDTO): Promise<IProject> {
  const { project_id, name, description, focused } = args;

  const request = await fetch(`${API_URL}/projects/project/${project_id}`, {
    method: 'put',
    body: JSON.stringify({
      name,
      description,
      focused
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();

  return response; 
}
export function UpdateProjectInfo(options?: MutationOptions<IProject, UpdateProjectDTO>) {

  return useMutation(updateProjectInfo, {
    ...options,
    onSuccess(updatedProject) {
      queryClient.setQueryData<IProject>('opened-project',updatedProject);
    }
  });
}


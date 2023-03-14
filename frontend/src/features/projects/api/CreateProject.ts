import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";

type CreateProjectDTO = { name: string, description?: string }

async function createProject(args: CreateProjectDTO) {
  const { name, description } = args;
  const request = await fetch(`${API_URL}/projects`, {
    method: 'post',
    body: JSON.stringify({ name, description }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();

  return response;
}

export function CreateProject(options?: MutationOptions<{}, CreateProjectDTO>) {
  return useMutation(createProject, options);
}


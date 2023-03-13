import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";

type AttachToProjectArguments = { project_id: string, inboxItem_id: string }

async function attachToProject(args: AttachToProjectArguments) {
  const { project_id, inboxItem_id } = args;

  const request = await fetch(`${API_URL}/inbox/attach-project`, {
    method: 'put',
    body: JSON.stringify({project_id, inboxItem_id}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();

  return response;
}

export function AttachToProject(options?: MutationOptions<{}, AttachToProjectArguments>) {
  return useMutation(
    attachToProject, 
    { ...options }
  );
}


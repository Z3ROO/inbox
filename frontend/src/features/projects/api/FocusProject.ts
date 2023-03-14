import { MutationOptions, useMutation } from "@/lib/query";

type FocusProjectDTO = { project_id: string } 

export async function focusProject(args: FocusProjectDTO ) {
  return {}
}

export function FocusProject(options?: MutationOptions<{}, FocusProjectDTO>) {
  return useMutation(focusProject, {
    ...options,
    
  });
}


import { API_URL } from "@/config/API";
import { IInboxItem } from "@/features/inbox/types"
import { IProject, ProjectQueueNode, ListOfProjects, ProjectUpdatableInfoFields } from "../types"

export async function getListOfProjects(): Promise<ListOfProjects> {
  const request = await fetch(`${API_URL}/projects`);
  const response = await request.json();

  return response;
}

export async function getProject({ project_id }: { project_id: string }): Promise<IProject> {
  const request = await fetch(`${API_URL}/projects/project/${project_id}`);
  const response = await request.json();

  return response
}

interface UpdateProjectInfo extends Partial<ProjectUpdatableInfoFields> {
  project_id: string
}

export async function updateProjectInfo(args: UpdateProjectInfo): Promise<IProject> {
  
  return {
    _id: 'project_id',
    name: args.name ? args.name : 'Project name',
    description: args.description ? args.description : 'Project description',
    created_at: new Date(),
    focused: true,
    attachments: {
      inbox: true
    }
  }
}

export async function createProject(args: { name: string, description?: string }) {
  const { name, description } = args;
  const request = await fetch(`${API_URL}/projects`, {
    method: 'post',
    body: JSON.stringify({ name, description }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();
}

export async function getProjectInbox({ project_id }: { project_id: string }): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/projects/inbox/${project_id}`); 
  const response = await request.json();
  return response;
}

export async function getCurrentProjectTask({ project_id }: { project_id: string }): Promise<ProjectQueueNode|null>{
  const request = await fetch(`${API_URL}/projects/task/${project_id}`); 
  const response = await request.json();
  console.log(response)
  return response;
}

export async function finishCurrentProjectTaks({ project_id }: { project_id: string }): Promise<ProjectQueueNode|null> {
  const request = await fetch(`${API_URL}/projects/task/${project_id}`, { method: 'delete' }); 
  const response = await request.json();
  return response;
}

export async function getFocusedProjects(): Promise<ListOfProjects> {
  return [
    {
      _id: 'project_id-tananan',
      name: 'Projeto tal',
      description: 'Tey'
    }
  ]
}

export async function focusProject(args: { project_id: string }) {
}


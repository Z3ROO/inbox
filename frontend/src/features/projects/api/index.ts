import { API_URL } from "@/config/API";
import { IInboxItem } from "@/features/inbox/types"
import { IProject, ProjectQueueNode, ListOfProjects, ProjectUpdatableInfoFields } from "../types"

export async function getListOfProjects(): Promise<ListOfProjects> {
  const request = await fetch(`${API_URL}/projects`);
  const response = await request.json();
  console.log(response)  
  return response;
  
  /* return [
    {
      _id: 'ProjetoUm',
      name: 'idzeroum',
      description: 'some description'
    },
    {
      _id: 'ProjetoDois',
      name: 'idzerodois',
      description: 'some description'
    },
    {
      _id: 'ProjetoTres',
      name: 'idzerotres',
      description: 'some description'
    },
    {
      _id: 'ProjetoQuatro',
      name: 'idzeroquatro',
      description: 'some description'
    },
    {
      _id: 'Projeto1Dois',
      name: 'idzero1doisasdasdasdasdasdasdasd',
      description: 'some description'
    },
    {
      _id: 'Projeto2Tres',
      name: 'idzero2tres',
      description: 'some description'
    },
    {
      _id: 'Projeto3Quatro',
      name: 'idzero4quatro',
      description: 'some description'
    },
    {
      _id: 'Projeto5Dois',
      name: 'idzero5dois',
      description: 'some description'
    },
    {
      _id: 'Projeto6Tres',
      name: 'idzero6tres',
      description: 'some description'
    },
    {
      _id: 'Projeto7Quatro',
      name: 'idzero7quatro',
      description: 'some description'
    }
  ] */
}

export async function getProject({ project_id }: { project_id: string }): Promise<IProject> {
  const request = await fetch(`${API_URL}/projects/${project_id}`);
  const response = await request.json();

  return response

/*   return {
    _id: 'project_id',
    name: 'Project name',
    description: 'Project description',
    created_at: new Date(),
    focused: true,
    attachments: {
      inbox: true
    }
  } */
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

export async function getProjectInbox(args: { project_id: string }): Promise<IInboxItem[]> {
  return []
}

export async function getCurrentProjectTask(args: { project_id: string }): Promise<ProjectQueueNode|null>{
  return {
    requirements: 'Queued 1',
    priority: 1,
    queued_at: new Date()
  }
}

export async function finishCurrentProjectTaks(arg: { project_id: string }): Promise<ProjectQueueNode|null> {
  return {
    requirements: 'Queued 2',
    priority: 2,
    queued_at: new Date()
  }

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


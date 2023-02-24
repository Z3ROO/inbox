import { IInboxItem } from "@/features/inbox/types"
import { IProject, IProjectQueueNode, ListOfProjects } from "../types"

export async function getListOfProjects(): Promise<ListOfProjects> {
  return [
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
  ]
}

export async function getProject(args: { project_id: string }): Promise<IProject> {
  return {
    _id: 'project_id',
    name: 'Project name',
    description: 'Project description',
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

export async function getProjectQueue(args: { project_id: string }): Promise<IProjectQueueNode[]> {
  return []
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


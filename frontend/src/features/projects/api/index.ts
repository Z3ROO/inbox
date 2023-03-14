import { ListOfProjects } from "../types"

export * from './QueryListOfProjects';
export * from './UpdateProjectInfo';
export * from './QueryCurrentProjectTask';
export * from './FinishCurrentProjectTask';
export * from './FocusProject';
export * from './QueryProject';
export * from './CreateProject';
export * from './QueryProjectInbox';

export async function getFocusedProjects(): Promise<ListOfProjects> {
  return [
    {
      _id: 'project_id-tananan',
      name: 'Projeto tal',
      description: 'Tey'
    }
  ]
}



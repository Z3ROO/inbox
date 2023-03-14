import { useContext, createContext, ReactNode } from 'react';
import { UseQueryResult } from 'react-query';
import { IProject } from '../types';
import * as ProjectAPI from '@/features/projects/api';

interface IProjectContext {
  projectQuery: UseQueryResult<IProject>
  project: IProject
}

const ProjectContext = createContext<IProjectContext|null>(null);
export const useProjectContext = () => useContext(ProjectContext);

export function ProjectContextProvider({ children, project_id }: { children: ReactNode, project_id: string }) {
  const project = ProjectAPI.QueryProject({project_id});
  
  const contextValue: IProjectContext = {
    projectQuery: project,
    project: project.data!
  }

  if (project.isLoading)
    return <h2>Loading...</h2>

  if (project.error || project.isIdle)
    return <h2>Something went wrong</h2>

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  )
}


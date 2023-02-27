import { useState, ReactNode } from 'react';
import { useProjectContext, ProjectContextProvider } from '@/features/projects/store/ProjectContext';

export function Project({ children, project_id }: { children: ReactNode, project_id: string}) {
  return (
    <ProjectContextProvider {...{project_id }}>
      <div className='fixed w-screen h-screen'>
        {children}
      </div>
    </ProjectContextProvider>
  )
}


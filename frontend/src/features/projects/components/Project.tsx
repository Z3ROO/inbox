import { createPortal } from 'react-dom';
import { ProjectContextProvider } from '../store/ProjectContext';
import { ProjectBody } from './ProjectBody';

export function Project({ project_id, closeProjectHandler }: { project_id: string, closeProjectHandler: () => void }) {
  return (
    <ProjectContextProvider {...{project_id}} >
      {
        createPortal(
          <ProjectBody {...{project_id, closeProjectHandler}} />,
          document.getElementById('root')!
        )
      }
    </ProjectContextProvider>
  )
}


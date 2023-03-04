import { HiArrowNarrowLeft } from "react-icons/hi";
import { BtnSecondary } from "@/components/Buttons";
import { useProjectContext } from "../store/ProjectContext";
import { useMutation } from "react-query";
import * as ProjectsAPI from '@/features/projects/api';
import { queryClient } from "@/App";
import { IProject } from "../types";

export function ProjectBody({ closeProjectHandler }: { closeProjectHandler?: () => void }) {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen bg-tanj-gray bg-opacity-80' style={{backdropFilter: 'blur(4px)'}}>
      <BtnSecondary bgLess
        className="absolute top-4 left-4"
        onClick={closeProjectHandler}
      >
        <HiArrowNarrowLeft />
      </BtnSecondary>
      <div className="flex justify-center items-center h-full">
        <Info />
        <Queue />
      </div>
    </div>
  )
}

function Info() {
  const { project } = useProjectContext()!;
  
  const editInfo = useMutation(ProjectsAPI.updateProjectInfo, {
    onSuccess(updatedProject) {
      console.log(updatedProject)
      queryClient.setQueryData<IProject>('opened-project',updatedProject);
    }
  });

  const editProjectInfo = (field: string) => (e:React.FocusEvent) => {
    const target = e.target as Element;
    editInfo.mutate({project_id: project._id, [field]: target.textContent});
  }

  return (
    <div className="text-tanj-white">
      <h3 contentEditable 
        onBlur={editProjectInfo('name')}
      >{project.name}</h3>
      <p contentEditable 
        onBlur={editProjectInfo('description')}
      >{project.description}</p>
    </div>
  )
}

function Queue() {
  return (
    <></>
  )
}

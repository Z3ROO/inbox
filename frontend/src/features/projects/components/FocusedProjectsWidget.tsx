import { HiPlus } from "react-icons/hi";
import { GiCaravel } from 'react-icons/gi';
import { useState } from "react"
import * as ProjectsAPI from '@/features/projects/api';
import { InputDetailedDataList } from "@/components/form/InputDetailedDataList";
import { useMutation } from "react-query";
import { Project } from "./Project";

export function ListOfProjectsWidget() {
  const [openedProject, setOpenedProject] = useState('');
  const query = ProjectsAPI.QueryListOfProjects();

  if (query.isLoading)
    return <>Loading...</>

  if (query.isError || query.isIdle)
    return <>Something wentwrong</>

  const list = query.data;

  return (
    <div className="m-2">
      {
        list.map(project => {
          return (
            <div 
              onClick={() => setOpenedProject(project._id)}
              className="relative w-8 h-8 p-1 m-1 rounded-sm bg-tanj-brown group">
              <GiCaravel className="w-full h-full" />
              <span className="absolute top-0 left-10 invisible group-hover:visible p-2 px-4 rounded-sm bg-tanj-brown text-white whitespace-nowrap">{project.name}</span>
            </div>
          )
        })
      }
      {
        list.length < 5 && (
          <FocusProject />
        )
      }
      {
        openedProject !== '' &&
          <Project project_id={openedProject} closeProjectHandler={() => setOpenedProject('')} />
      }
    </div>
  )
}

function FocusProject() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
 
  const listOfProjects = ProjectsAPI.QueryListOfProjects();
  const focusMutation = ProjectsAPI.FocusProject({
    onSuccess() {
      setIsPickerOpen(false);
    }
  });

  if (listOfProjects.isLoading)
    return <>Loading ...</>

  if (listOfProjects.isError || listOfProjects.isIdle)
    return <>Something went worng</>

  const projectDataList = listOfProjects.data.map(project => ({ label: project.name, value: project._id }));
  
  return (
    <div className="relative w-8 h-8 p-1 m-1 rounded-sm bg-tanj-brown group">
      <HiPlus className="w-full h-full" onClick={() => setIsPickerOpen(prev => !prev)}/>
      {
        isPickerOpen ?
        <div className="absolute -top-2 left-10 w-80 h-48 bg-tanj-brown rounded-sm">
          <InputDetailedDataList
              options={projectDataList} 
              onSelect={(option) => {
                focusMutation({ project_id: option.value });
              }} />
          </div> :
          <span className="absolute top-0 left-10 invisible group-hover:visible p-2 px-4 rounded-sm bg-tanj-brown text-white whitespace-nowrap">Focus a project</span>
      }
    </div>
  )
}

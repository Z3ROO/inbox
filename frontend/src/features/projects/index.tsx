import { HiPlus } from "react-icons/hi";
import { GiCaravel } from 'react-icons/gi';
import { useEffect, useState } from "react"
import * as ProjectsAPI from '@/features/projects/api';
import { ListOfFocusedProjects } from "./types";
import { InputDetailedDataList } from "@/components/form/InputDetailedDataList";
import { useMutation, useQuery } from "react-query";

export function ListOfProjectsWidget() {
  const [list, setList] = useState<ListOfFocusedProjects>([]);

  useEffect(() => {
    (async function() {
      const data = await ProjectsAPI.getFocusedProjects();
      setList(data);
    })();
  }, []);

  return (
    <div className="m-2">
      {
        list.map(project => {
          return (
            <div className="relative w-8 h-8 p-1 m-1 rounded-sm bg-tanj-brown group">
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
    </div>
  )
}

function FocusProject() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
 
  const listOfProjects = useQuery('project-list', ProjectsAPI.getListOfProjects);
  const focusMutation = useMutation(ProjectsAPI.focusProject, {
    onSuccess() {
      setIsPickerOpen(false);
    }
  });
  
  if (listOfProjects.isLoading)
    return <>Loading ...</>

  const projectDataList = listOfProjects.data!;
  
  return (
    <div className="relative w-8 h-8 p-1 m-1 rounded-sm bg-tanj-brown group">
      <HiPlus className="w-full h-full" onClick={() => setIsPickerOpen(prev => !prev)}/>
      {
        isPickerOpen ?
        <div className="absolute -top-2 left-10 w-80 h-48 bg-tanj-brown rounded-sm">
          <InputDetailedDataList
              options={projectDataList} 
              onSelect={(option) => {
                focusMutation.mutate({ project_id: option.value });
              }} />
          </div> :
          <span className="absolute top-0 left-10 invisible group-hover:visible p-2 px-4 rounded-sm bg-tanj-brown text-white whitespace-nowrap">Focus a project</span>

      }
    </div>
  )
}

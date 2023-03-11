import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import * as ProjectsAPI from '@/features/projects/api';
import * as InboxAPI from '@/features/inbox/api';
import { DatalistDetailedOptionType, InputDetailedDataList } from "@/components/form/InputDetailedDataList";
import { queryClient } from "@/App";

export function SelectProject() {
  const { panelMode, setPanelMode, inboxItems } = useFilterPanelContext()!
  const [project, setProject] = useState<DatalistDetailedOptionType>();
  const inboxItem_id = inboxItems[0]._id;
  
  const listOfProjects = useQuery('project-list', ProjectsAPI.getListOfProjects);
  const attachToProject = useMutation(InboxAPI.attachToProject);
  const createProject = useMutation(ProjectsAPI.createProject);

  if (listOfProjects.isLoading)
    return <>Loading ...</>
  
  const projectDataList = listOfProjects.data!.map(project => ({ label: project.name, value: project._id }));

  function submit(option: DatalistDetailedOptionType) {
    if (option.value === '') {
      if (option.label === '')
        return

      createProject.mutate({ name: option.label }, {
        onSuccess() {
          queryClient.refetchQueries(['inbox-items'], { active: true, exact: true });
          setPanelMode('normal'); 
        }
      });
      return
    }

    let project_id:string;
    if (option)
      project_id = option.value;
    else
      project_id = project!.value;

    attachToProject.mutate({project_id, inboxItem_id},{
      onSuccess() {
        queryClient.refetchQueries(['inbox-items'], { active: true, exact: true });
        setPanelMode('normal'); 
      }
    });
  }

  return (
    <InputDetailedDataList value={project} setValue={setProject} options={projectDataList} onSubmit={submit} onSelect={submit} />
  )
}



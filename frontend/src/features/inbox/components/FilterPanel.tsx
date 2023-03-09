import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import { HiArrowDownOnSquareStack } from "react-icons/hi2";
import { useFilterPanelContext } from "@/features/inbox/store/FilterPanelContext";
import { InboxDelayAmounts, PanelMode } from "@/features/inbox/types";
import { BiLoaderAlt } from 'react-icons/bi';
import { Textarea } from "@/components/form/Input";
import { DatalistDetailedOptionType, DetailedDataList, InputDetailedDataList } from "@/components/form/InputDetailedDataList";
import { useMutation, useQuery } from "react-query";
import * as ProjectsAPI from '@/features/projects/api';
import * as InboxAPI from '@/features/inbox/api';
import { queryClient } from "@/App";

export function InboxFilterPanelModal() {
  const { isFilterPanelOpen, toggleFilterPanel } = useFilterPanelContext()!;

  return (
    <Modal isModalOpen={isFilterPanelOpen} closeFn={toggleFilterPanel}>
      <FilterPanel />
    </Modal>
  )
}

function FilterPanel() {
  const { inboxItems, panelMode, setPanelMode } = useFilterPanelContext()!;

  return (
    <div className="w-[30rem] m-2">
      <div className="flex justify-between">
        <span className="text-tanj-green font-medium text-3xl">Inbox:</span>
        <ChooseProjectButton />
      </div>
      <div className="relative h-56">
        {
          panelMode === 'normal' ? <InputField /> : <SetOptionsField />
        }
      </div>
      <div className="flex justify-between">
        <EnqueueInboxItemButton />
        <LastDelayLog />
      </div>
      <Controlls />
    </div>
  )
}

function ChooseProjectButton() {
  const { inboxItems, setPanelMode } = useFilterPanelContext()!;

  const currentInboxItem = inboxItems[0];

  return (
    <BtnSecondary bgLess 
      className="m-0"
      onClick={() => setPanelMode(prev => prev === 'select-project' ? 'normal' : 'select-project')}
    >
      <span>{currentInboxItem.project?.name || 'Choose a project'}</span>
    </BtnSecondary>
  )
}

function EnqueueInboxItemButton() {
  const { inboxItems, setPanelMode } = useFilterPanelContext()!;

  const currentInboxItem = inboxItems[0];

  return (
    <BtnSecondary icon bgLess 
      className="m-0 py-0" 
      disabled={!currentInboxItem.project?.name} 
      onClick={() => setPanelMode(prev => prev === 'enqueue' ? 'normal' : 'enqueue')}
    >
      <HiArrowDownOnSquareStack className="w-4 h-4" />
    </BtnSecondary>
  )
}

function InputField() {
  const { inboxItems, inboxFilterText, setInboxFilterText, updateInboxItem } = useFilterPanelContext()!;

  useEffect(() => {
    setInboxFilterText(inboxItems[0].content);
  }, [inboxItems]);


  return (
    <>
      <Textarea
        className={`resize-none w-full h-full`}
        value={inboxFilterText} onChange={e => setInboxFilterText(e.target.value)}
      />
      {
        updateInboxItem.isLoading &&
        <BiLoaderAlt className="absolute top-4 right-4 animate-spin" />
      }
    </>

  )
}

function SetOptionsField() {
  const { panelMode } = useFilterPanelContext()!;
  const content = SwitchSetters(panelMode);

  return (
    <div className="w-full h-full border-2 border-tanj-green rounded-sm bg-tanj-gray">
      {content}
    </div>
  )

}

function SwitchSetters(mode: PanelMode): JSX.Element | null {
  switch (mode) {
    case 'enqueue':
      return <Enqueue />
    case 'select-project':
      return <SelectProject />
    default:
      return null
  }
}

function SelectProject() {
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

function Enqueue() {
  const { panelMode, setPanelMode, inboxItems } = useFilterPanelContext()!
  const inboxItem_id = inboxItems[0]._id;

  const enqueueMutation = useMutation(InboxAPI.enqueueInboxItem);
 
  function enqueueInboxItem(priority: number) {
    enqueueMutation.mutate(
      {priority, inboxItem_id},{
        onSuccess() {
          queryClient.refetchQueries(['inbox-items'], { active: true, exact: true });
          setPanelMode('normal');
        }
      }
    );

  } 

  return (
    <div className={`flex flex-wrap justify-center items-center`} >
      <BtnPrimary onClick={() => enqueueInboxItem(0)}>Urgent</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(1)}>Important/Necessary</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(2)}>Important</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(3)}>Necessary</BtnPrimary>
      <BtnPrimary onClick={() => enqueueInboxItem(4)}>Should be done</BtnPrimary>
    </div>
  )
}

function LastDelayLog() {
  const { inboxItems } = useFilterPanelContext()!;

  const { delayed_at, amount } = inboxItems[0].last_delay || {};

  return (
    <div className="text-right">
      <span className="text-sm text-tanj-green">
        {
          (delayed_at && amount) ?
            `Delayed for ${amount.includes('-') ? '' : 'a '}${amount.replace(/-/g, ' ')} on ${new Date(delayed_at).toLocaleDateString(['pt-BR'])}.` :
            `Never delayed.`
        }
      </span>
      {
        inboxItems[0].project?.queue != null &&
          <>
            <br/>
            <span className="text-sm text-tanj-green">
              Inbox item queued to be done.
            </span>
          </>
      }
    </div>
  )
}

function Controlls() {
  const { inboxItems, updateInboxItem, inboxFilterText } = useFilterPanelContext()!
  const { mutate: updateItem, isLoading } = updateInboxItem;

  const currentItem = inboxItems[0];

  return (
    <div className="flex justify-between mt-2 text-sm">
      {
        ['Day', 'Week', 'Month', '3 Months'].map(amount => (
          <BtnPrimary
            onClick={() => updateItem({ content: inboxFilterText, inboxItem_id: currentItem._id, action: amount.toLowerCase().replace(/ /g, '-') as InboxDelayAmounts })}
            disabled={isLoading}
          >{amount}</BtnPrimary>
        ))
      }
      <BtnSecondary icon bgLess
        disabled={isLoading}
        onClick={() => updateItem({ inboxItem_id: currentItem._id, action: 'remove' })}
      >
        <FaTrashAlt />
      </BtnSecondary>
      <BtnSecondary icon bgLess
        disabled={isLoading}
        onClick={() => updateItem({ inboxItem_id: currentItem._id, action: 'undo' })}
      >
        <FaUndoAlt />
      </BtnSecondary>
    </div>
  )
}

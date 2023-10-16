import { Modal } from "@/components/Modal";
import { useFilterPanelContext } from "@/features/inbox/store/FilterPanelContext";
import { StatusLog } from "./StatusLog";
import { InputField } from "./InputField";
import { Controlls } from "./Controlls";
import * as InboxAPI from '@/features/inbox/api';
import { TfiLayoutSidebarNone } from "react-icons/tfi";
import timePassedSince from "../util/timePassedSince";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import { IoAlertCircle } from "react-icons/io5";
import { BsFillPinAngleFill } from "react-icons/bs";
import { AiFillAlert, AiOutlineFieldTime } from "react-icons/ai";
import { BtnPrimary, BtnSecondary, DropDownOnClickButton } from "@/components/Buttons";
import { InputDataList } from "@/components/form/InputDataList";

export function InboxFilterPanelModal() {
  const { isFilterPanelOpen, toggleFilterPanel } = useFilterPanelContext()!;

  return (
    <Modal isModalOpen={isFilterPanelOpen} closeFn={toggleFilterPanel}>
      <FilterPanel />
    </Modal>
  )
}

function FilterPanel() {
  const inboxQuery = InboxAPI.QueryInbox();
  
/*
* All the proceding use of inboxItems depends on these conditions
* */
  if (inboxQuery.isLoading)
    return <h2 className="m-4 mx-10 text-tanj-green">Loading...</h2>
  if (inboxQuery.error)
    return <h2 className="m-4 mx-10 text-tanj-pink">Something Went wrong</h2>
  // ?? check if is idle ??
  if (!inboxQuery.data || inboxQuery.data.length === 0)
    return (
      <h2 className="m-4 mx-10 text-tanj-green">Inbox empty.</h2>
    )

  const timePassed = timePassedSince(inboxQuery.data[0].created_at);

  return (
    <div className="w-[36rem] m-2">
      <span className="text-tanj-green font-medium text-3xl">Inbox:</span>
      <div className="flex py-2 gap-2">
        <Category />
        <Priority />
        <TimePassed {...timePassed} />
      </div>
      <InputField />
      <StatusLog />
      <Controlls />
    </div>
  )
}

function Category() {
  const inboxQuery = InboxAPI.QueryInbox();
  const draft = inboxQuery.data![0];
  const [category, setCategory] = useState({label: '', value: ''});
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  
  const queryCategory = InboxAPI.QueryCategories();  
  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <button className="text-left" onClick={() => {setShowCategoryPicker(prev => !prev); setCategory({label:'', value:''})}}>
      <div className="group relative">
        <InfoTag className="bg-blue-600" Icon={TfiLayoutSidebarNone}>{draft.category.name}</InfoTag>
        {
          showCategoryPicker && (
          <div onClick={e => e.stopPropagation()} className="absolute top-full left-0 bg-tanj-gray px-2 py-1 rounded-sm mt-1 flex items-center z-10 cursor-default">
            <InputDataList
              options={(queryCategory.data??[]).map(({_id, name}) => ({value:_id, label:name}))}
              value={category}
              setValue={setCategory}
            />
            <BtnSecondary onClick={e => {
              setShowCategoryPicker(false)
              console.log(category.label)
              updateDraft({
                draft_id: draft._id,
                action: 'organization',
                category: category.label
              })
            }} icon>+</BtnSecondary>
          </div>
          )
        }
      </div>
    </button>
  )
}

function Priority() {
  const inboxQuery = InboxAPI.QueryInbox();
  const draft = inboxQuery.data![0];

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <DropDownOnClickButton  position="bottom" align="center" main={
      <button>
        <InfoTag {...getPriorityProps(draft.priority)} />
      </button>
    }>
      <button onClick={() => updateDraft({draft_id: draft._id, action: 'organization', priority: 3})}>
        <InfoTag {...getPriorityProps(3)} />
      </button>
      <button onClick={() => updateDraft({draft_id: draft._id, action: 'organization', priority: 2})}>
        <InfoTag {...getPriorityProps(2)} />
      </button>
      <button onClick={() => updateDraft({draft_id: draft._id, action: 'organization', priority: 1})}>
        <InfoTag {...getPriorityProps(1)} />
      </button>
      <button onClick={() => updateDraft({draft_id: draft._id, action: 'organization', priority: 0})}>
        <InfoTag {...getPriorityProps(0)} />
      </button>
    </DropDownOnClickButton>
  )
}

function getPriorityProps(priority: number) {
  if (priority === 1)
    return { children: 'Necessary', className: 'bg-green-400', Icon: BsFillPinAngleFill}
  else if (priority === 2)
    return { children: 'Important', className: 'bg-orange-500', Icon: IoAlertCircle}
  else if (priority === 3)
    return { children: 'Urgent', className: 'bg-red-400', Icon: AiFillAlert}
  else
    return { children: 'None', className: 'bg-gray-350', Icon: TfiLayoutSidebarNone}
}

function TimePassed({value, metric}: { value: number, metric: string}) {
  let color = 'bg-gray-300';
  
  if (metric === 'year')
    color = 'bg-red-500';
  else if (metric === 'month')
    color = 'bg-orange-500';
  else if (metric === 'week')
    color = 'bg-yellow-400';

  return (
    <InfoTag className={` ${color} `} Icon={AiOutlineFieldTime}>
      {`${value} ${metric}s`}
    </InfoTag>
  )
}

function InfoTag({children, Icon, className}: { children: ReactNode, Icon: IconType, className?: string }) {
  return (
    <div className={`py-1 px-2 rounded-sm flex items-center ${className}`}>
      <span className="mr-2">
        <Icon />
      </span>
      <span>{children}</span>
    </div>
  )
}


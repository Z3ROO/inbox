import { TfiLayoutSidebarNone } from "react-icons/tfi";
import timePassedSince from "../../util/timePassedSince";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import { IoAlertCircle } from "react-icons/io5";
import { BsFillPinAngleFill } from "react-icons/bs";
import { AiFillAlert, AiOutlineFieldTime } from "react-icons/ai";
import { Button } from "@/components/Buttons";
import { InputDataList } from "@/components/form/InputDataList";
import * as InboxAPI from '@/features/inbox/api';
import { useInboxContext } from "../../store/InboxContext";
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from "@/components/dropdown";

export function InfoTags() {
  const inboxQuery = InboxAPI.QueryInbox();

  const timePassed = timePassedSince(inboxQuery.data![0].created_at);

  return (
    <div className="flex py-2 gap-2">
      <Subject />
      <Priority />
      <TimePassed {...timePassed} />
    </div>
  )
}

function Subject() {
  const [subject, setSubject] = useState({label: '', value: ''});
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const { draft } = useInboxContext()!;
  
  const querySubject = InboxAPI.QuerySubjects();  
  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <button className="text-left" onClick={() => {setShowSubjectPicker(prev => !prev); setSubject({label:'', value:''})}}>
      <div className="group relative">
        <InfoTag className="bg-blue-600" Icon={TfiLayoutSidebarNone}>{draft!.subject?.name}</InfoTag>
        {
          showSubjectPicker && (
          <div onClick={e => e.stopPropagation()} className="absolute top-full left-0 bg-tanj-gray px-2 py-1 rounded-sm mt-1 flex items-center z-10 cursor-default">
            <InputDataList
              options={(querySubject.data??[]).map(({_id, name}) => ({value:_id, label:name}))}
              value={subject}
              setValue={setSubject}
            />
            <Button onClick={e => {
              setShowSubjectPicker(false)
              
              updateDraft({
                draft_id: draft!._id,
                action: 'organization',
                subject: subject.label,
                title: draft!.title,
                content: draft!.content
              })
            }} icon>+</Button>
          </div>
          )
        }
      </div>
    </button>
  )
}

function Priority() {
  const { draft } = useInboxContext()!;

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <DropDownMenu>
      <DropDownMenuTriggerOnClick>
        <InfoTag {...getPriorityProps(draft!.priority)} />
      </DropDownMenuTriggerOnClick>
      <DropDownMenuContent position="bottom" align="center">
        <DropDownMenuItem onClick={() => updateDraft({draft_id: draft!._id, action: 'organization', priority: 3, content: draft!.content})}>
          <InfoTag {...getPriorityProps(3)} />
        </DropDownMenuItem>
        <DropDownMenuItem onClick={() => updateDraft({draft_id: draft!._id, action: 'organization', priority: 2, content: draft!.content})}>
          <InfoTag {...getPriorityProps(2)} />
        </DropDownMenuItem>
        <DropDownMenuItem onClick={() => updateDraft({draft_id: draft!._id, action: 'organization', priority: 1, content: draft!.content})}>
          <InfoTag {...getPriorityProps(1)} />
        </DropDownMenuItem>
        <DropDownMenuItem onClick={() => updateDraft({draft_id: draft!._id, action: 'organization', priority: 0, content: draft!.content})}>
          <InfoTag {...getPriorityProps(0)} />
        </DropDownMenuItem>
      </DropDownMenuContent>
    </DropDownMenu>
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
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
import { useDraftEditor } from "../../store/DraftEditorContext";
import { DropDownMenu, DropDownMenuContent, DropDownMenuItem, DropDownMenuTriggerOnClick } from "@/components/dropdown";

export function InfoTags() {
  const { draft, mode } = useDraftEditor()!;

  const timePassed = timePassedSince(draft!.created_at);

  return (
    <div className="flex py-2 gap-2">
      <Subject />
      <Priority />
      { mode === 'edit' && <TimePassed {...timePassed} />}
    </div>
  )
}

function Subject() {
  const { draft, setDraft, mode } = useDraftEditor()!;
  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <>
    {
      mode === 'create' && (
        <SubjectSetter cb={(subject) => { setDraft(prev => ({...prev!, subject: {_id: subject.value, name: subject.label, icon: '', color: ''}})); }} />
      )
    }
    {
      mode === 'edit' && (
        <SubjectSetter 
          cb={(subject) => { 
            updateDraft({
              draft_id: draft!._id,
              action: 'organization',
              subject: subject.label,
              title: draft!.title,
              content: draft!.content
            })
          } 
        }/>
      )
    }
    </>
  )
}

function SubjectSetter({cb}: {
    cb: (subject: {
      label: string;
      value: string;
    }) => void
  }) {

  const [subject, setSubject] = useState({label: '', value: ''});
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const { draft } = useDraftEditor()!;
  
  const querySubject = InboxAPI.QuerySubjects();  

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
              cb(subject);
              setShowSubjectPicker(false)
            }} icon>+</Button>
          </div>
          )
        }
      </div>
    </button>
  )
}

function Priority() {
  const { draft, setDraft, mode } = useDraftEditor()!;

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <>
      {
        mode === 'create' && <PrioritySetter cb={(priority) => { setDraft(prev => ({...prev!, priority}))}} /> 
      }
      {
        mode === 'edit' && (
          <PrioritySetter cb={(priority) => updateDraft({draft_id: draft!._id, action: 'organization', priority, content: draft!.content})} />
        )
      }
    </>
  )
}

function PrioritySetter({cb}: {cb: (priority: number) => void}) {
  const { draft } = useDraftEditor()!;

  return (
    <DropDownMenu>
      <DropDownMenuTriggerOnClick>
        <InfoTag {...getPriorityProps(draft!.priority)} />
      </DropDownMenuTriggerOnClick>
      <DropDownMenuContent position="bottom" align="center">
        <DropDownMenuItem onClick={() => cb(3)}>
          <InfoTag {...getPriorityProps(3)} />
        </DropDownMenuItem>
        <DropDownMenuItem onClick={() => cb(2)}>
          <InfoTag {...getPriorityProps(2)} />
        </DropDownMenuItem>
        <DropDownMenuItem onClick={() => cb(1)}>
          <InfoTag {...getPriorityProps(1)} />
        </DropDownMenuItem>
        <DropDownMenuItem onClick={() => cb(0)}>
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
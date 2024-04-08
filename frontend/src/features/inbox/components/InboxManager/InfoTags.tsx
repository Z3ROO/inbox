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
import { Priority as PriorityIcons } from "@/components/icons/UI";

export function InfoTags() {
  const { draft, mode } = useDraftEditor()!;

  const timePassed = timePassedSince(draft!.created_at);

  return (
    <div className="flex py-2 gap-2">
      <Subject />
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

export function Priority() {
  const { draft, setDraft, mode } = useDraftEditor()!;

  const updateDraft = InboxAPI.UpdateDraft();

  return (
    <PrioritySetter 
      cb={(priority) => {
        if (mode === 'create')
          setDraft(prev => ({...prev!, priority}));
        else if (mode === 'edit')
          updateDraft({draft_id: draft!._id, action: 'organization', priority, content: draft!.content, title: draft!.title})    
      }} 
    />
  )
}

function PrioritySetter({cb}: {cb: (priority: number) => void}) {
  const { draft } = useDraftEditor()!;

  return (
    <div className="flex flex-col gap-2 pl-2">
      <Button variant="discret" style={{
        filter: draft?.priority === 3 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 3 ? '1' : '.6',
        backgroundColor: draft?.priority === 3 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(3)} title="Urgent">
        <PriorityIcons.urgent className="w-5 h-5 text-red-400" />
      </Button>
      <Button variant="discret"  style={{
        filter: draft?.priority === 2 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 2 ? '1' : '.6',
        backgroundColor: draft?.priority === 2 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(2)} title="Important">
        <PriorityIcons.important className="w-5 h-5 text-orange-500" />
      </Button>
      <Button variant="discret"  style={{
        filter: draft?.priority === 1 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 1 ? '1' : '.6',
        backgroundColor: draft?.priority === 1 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(1)} title="Necessary">
        <PriorityIcons.necessary className="w-5 h-5 text-green-400" />
      </Button>
      <Button variant="discret"  style={{
        filter: draft?.priority === 0 ? 'none' :'grayscale(1)',
        opacity: draft?.priority === 0 ? '1' : '.6',
        backgroundColor: draft?.priority === 0 ? 'rgba(255, 255, 255, 0.10)' : undefined
      }} icon onClick={() => cb(0)} title="None">
        <PriorityIcons.none className="w-5 h-5 text-gray-350" />
      </Button>
    </div>
  )
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
import { Button } from "@/components/Buttons";
import { useState, useEffect, useMemo } from "react";
import { useInboxContext } from "../../store/InboxContext";
import { cacheInsertInputField, getCachedInsertInputField } from "../../util/cacheInsertField";
import * as InboxAPI from '@/features/inbox/api'
import { Textarea } from "@/components/form/Input";
import { TfiLayoutSidebarNone } from 'react-icons/tfi';
import { InputDataList } from "@/components/form/InputDataList";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";
import { AiFillAlert } from "react-icons/ai";
import { ISubject } from "shared-types";
import { IconType } from "react-icons/lib";

export function InboxInsertPanel() {
  const [titleInputText, setTitleInputText] = useState('');
  const [contentInputText, setContentInputText] = useState('');
  const [subject, setSubject] = useState({label: '', value: ''});
  const [priority, setPriority] = useState(0);

  const subjects = InboxAPI.QuerySubjects();

  const insertDraft = InboxAPI.InsertDraft();

  async function insertInbox() {
    if (contentInputText.trim() === '')
      return;
    insertDraft({
      title: titleInputText,
      content: contentInputText,
      subject: subject.label,
      priority
    });
    setTitleInputText('');
    setContentInputText('');
    setSubject({label: '', value: ''});
    setPriority(0);
    cacheInsertInputField('');
  }

  return (
    <div className="flex">
      <div className="grow">
        <SelectSubject {...{subject, setSubject, subjects: subjects.data??[]}} />
        <InsertPanelInputField {...{titleInputText, setTitleInputText, contentInputText, setContentInputText}} />
        <InsertPanelControlls {...{insertInbox}} />
      </div>
      <SelectPriority {...{priority, setPriority}} />
    </div>
  )
}

function SelectSubject({subject, setSubject, subjects}: 
    {
      subject:{ label: string, value: string }, 
      setSubject: React.Dispatch<React.SetStateAction<{ label: string, value: string }>>,
      subjects: ISubject[]
    }
  ) {

  const existingSubjects = useMemo(() => {
    return subjects.map(({_id, name}) => ({ value: _id, label: name }));
  }, [subjects]);

  return (
    <div className="py-2 w-full">
      <InputDataList 
        className="w-full" 
        options={existingSubjects} value={subject} 
        setValue={setSubject} 
      />
    </div>
  )
}

function SelectPriority({priority, setPriority}: {priority: number , setPriority: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div className="flex flex-col py-16 p-2 gap-2">
      <SelectPriorityOption
        priority={3}
        selectedPriority={priority}
        Icon={AiFillAlert}
        onClick={() => setPriority(3)}
      >
        {`Urgent`}
      </SelectPriorityOption>
      <SelectPriorityOption
        priority={2}
        selectedPriority={priority}
        Icon={IoAlertCircle}
        onClick={() => setPriority(2)}
      >
        {`Important`}
      </SelectPriorityOption>
      <SelectPriorityOption
        priority={1}
        selectedPriority={priority}
        Icon={BsFillPinAngleFill}
        onClick={() => setPriority(1)}
      >
        {`Necessary`}
      </SelectPriorityOption>
      <SelectPriorityOption
        priority={0}
        selectedPriority={priority}
        Icon={TfiLayoutSidebarNone}
        onClick={() => setPriority(0)}
      >
        {`None`}
      </SelectPriorityOption>
    </div>
  )
}

function SelectPriorityOption(
    { priority, selectedPriority, onClick, Icon, children }: 
    React.HTMLProps<HTMLButtonElement> & { priority: number, selectedPriority: number, Icon: IconType }
  ) {
  return (
    <button {...{onClick}} style={{
      opacity: priority === selectedPriority ? '1' : undefined
    }} className="group relative opacity-40 hover:opacity-100">
      <div className="text-base p-2 relative group-hover:z-20 text-tanj-green group-hover:text-tanj-brown">
        <Icon />
      </div>
      <div className="group-hover:visible invisible absolute top-0 left-0 p-1 pl-8 pr-2 bg-gray-300 z-10">
        <span className="text-sm">{children}</span>
      </div>
    </button>
  )
}

function InsertPanelInputField(props: { 
  titleInputText: string , setTitleInputText: React.Dispatch<React.SetStateAction<string>>
  contentInputText: string , setContentInputText: React.Dispatch<React.SetStateAction<string>>
}) {
  const {
    titleInputText, setTitleInputText,
    contentInputText, setContentInputText
  } = props;

  useEffect(() => {
    const cachedInsertText = getCachedInsertInputField();
    setContentInputText(cachedInsertText);
  },[]);

  return (
    <div className="flex flex-col w-full">
      <Textarea 
        className={`resize-none w-96 h-10 font-bold`} 
        value={titleInputText} 
        onChange={e => { 
          setTitleInputText(e.target.value); 
          cacheInsertInputField(e.target.value);
        }}
      />
      <Textarea 
        className={`resize-none w-96 h-56`} 
        value={contentInputText} 
        onChange={e => { 
          setContentInputText(e.target.value); 
          cacheInsertInputField(e.target.value);
        }}
      />
    </div>
  )
}

function InsertPanelControlls(props: { insertInbox: () => Promise<void> }) {
  const { toggleInboxManager } = useInboxContext()!;
  const { insertInbox } = props;
  const inbox = InboxAPI.QueryInbox().data;
  
  return (
    <div className="flex justify-between">
      <Button variant="primary"
        onClick={insertInbox}
      >Add</Button>
      <Button
        onClick={toggleInboxManager}
        disabled={!(inbox?.length)}
      >Free</Button>
    </div>
  )
}

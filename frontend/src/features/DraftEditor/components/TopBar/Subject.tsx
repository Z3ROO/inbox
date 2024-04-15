import { Button } from "@/components/Buttons";
import { InputDataList } from "@/components/form/InputDataList";
import { useDraftEditor } from "@/features/DraftEditor/store/DraftEditorContext";
import { useState } from "react";
import { TfiLayoutSidebarNone } from "react-icons/tfi";
import * as DraftEditorAPI from '@/features/DraftEditor/api';
import { InfoTag } from "./Tag";

export function Subject() {
  const { draft, setDraft, mode } = useDraftEditor();
  const updateDraft = DraftEditorAPI.UpdateDraft();

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
  const { draft } = useDraftEditor();
  
  const querySubject = DraftEditorAPI.QuerySubjects();  

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
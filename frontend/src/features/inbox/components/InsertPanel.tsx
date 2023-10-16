import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { useState, useEffect } from "react";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { cacheInsertInputField, getCachedInsertInputField } from "../util/cacheInsertField";
import * as InboxAPI from '@/features/inbox/api'
import { Input, Textarea } from "@/components/form/Input";
import { TfiLayoutSidebarNone } from 'react-icons/tfi';
import { InputDataList } from "@/components/form/InputDataList";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";
import { AiFillAlert } from "react-icons/ai";

export function InboxInsertPanel() {
  const [insertFieldText, setInsertFieldText] = useState('');
  const [category, setCategory] = useState({label: '', value: ''});
  const [priority, setPriority] = useState(0);

  const queryCategory = InboxAPI.QueryCategories();

  const insertDraft = InboxAPI.InsertDraft();

  async function insertInbox() {
    if (insertFieldText.trim() === '')
      return;
    insertDraft({
      content: insertFieldText,
      category: category.label,
      priority
    });
    setInsertFieldText('');
    setCategory({label: '', value: ''});
    setPriority(0);
    cacheInsertInputField('');
  }

  return (
    <div className="flex">
      <div className="grow">
        <div className="py-2 w-full">
          <InputDataList className="w-full" options={(queryCategory.data??[]).map(({_id, name}) => ({value:_id, label:name}))} value={category} setValue={setCategory} />
        </div>
        <InsertPanelInputField {...{insertFieldText, setInsertFieldText}} />
        <InsertPanelControlls {...{insertInbox}} />
      </div>
      <div className="flex flex-col py-16 p-2 gap-2">
        <div style={{
          opacity: priority === 3 ? '1' : undefined
        }} className="group relative opacity-40 hover:opacity-100">
          <button onClick={() => setPriority(3)} className="text-base p-2 relative group-hover:z-20 text-tanj-green group-hover:text-tanj-brown">
            <AiFillAlert />
          </button>
          <div className="group-hover:visible invisible absolute top-0 left-0 p-1 pl-8 pr-2 bg-gray-300 z-10">
            <span className="text-sm">Urgent</span>
          </div>
        </div>
        <div style={{
          opacity: priority === 2 ? '1' : undefined
        }} className="group relative opacity-40 hover:opacity-100">
          <button onClick={() => setPriority(2)} className="text-base p-2 relative group-hover:z-20 text-tanj-green group-hover:text-tanj-brown">
            <IoAlertCircle />
          </button>
          <div className="group-hover:visible invisible absolute top-0 left-0 p-1 pl-8 pr-2 bg-gray-300 z-10">
            <span className="text-sm">Important</span>
          </div>
        </div>
        <div style={{
          opacity: priority === 1 ? '1' : undefined
        }} className="group relative opacity-40 hover:opacity-100">
          <button onClick={() => setPriority(1)} className="text-base p-2 relative group-hover:z-20 text-tanj-green group-hover:text-tanj-brown">
            <BsFillPinAngleFill />
          </button>
          <div className="group-hover:visible invisible absolute top-0 left-0 p-1 pl-8 pr-2 bg-gray-300 z-10">
            <span className="text-sm">Necessary</span>
          </div>
        </div>
        <div style={{
          opacity: priority === 0 ? '1' : undefined
        }}  className="group relative opacity-40 hover:opacity-100">
          <button onClick={() => setPriority(0)} className="text-base p-2 relative group-hover:z-20 text-tanj-green group-hover:text-tanj-brown">
            <TfiLayoutSidebarNone />
          </button>
          <div className="group-hover:visible invisible absolute top-0 left-0 p-1 pl-8 pr-2 bg-gray-300 z-10">
            <span className="text-sm">None</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function InsertPanelInputField(props: { 
  insertFieldText: string , setInsertFieldText: React.Dispatch<React.SetStateAction<string>>
}) {
  const {insertFieldText, setInsertFieldText} = props;

  useEffect(() => {
    const cachedInsertText = getCachedInsertInputField();
    setInsertFieldText(cachedInsertText);
  },[]);

  return (
    <Textarea 
      className={`resize-none w-96 h-56`} 
      value={insertFieldText} 
      onChange={e => { 
        setInsertFieldText(e.target.value); 
        cacheInsertInputField(e.target.value);
      }}
    />
  )
}

function InsertPanelControlls(props: { insertInbox: () => Promise<void> }) {
  const { toggleFilterPanel } = useFilterPanelContext()!;
  const { insertInbox } = props;
  const inbox = InboxAPI.QueryInbox().data;
  
  return (
    <div className="flex justify-between">
      <BtnPrimary
        onClick={insertInbox}
      >Add</BtnPrimary>
      <BtnPrimary
        onClick={toggleFilterPanel}
        disabled={!(inbox?.length)}
      >Free</BtnPrimary>
    </div>
  )
}

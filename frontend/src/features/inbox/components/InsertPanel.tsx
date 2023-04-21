import { BtnPrimary } from "@/components/Buttons";
import { useState, useEffect } from "react";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { cacheInsertInputField, getCachedInsertInputField } from "../util/cacheInsertField";
import * as InboxAPI from '@/features/inbox/api'
import { Textarea } from "@/components/form/Input";

export function InboxInsertPanel() {
  const [insertFieldText, setInsertFieldText] = useState('');

  const insertInboxItem = InboxAPI.InsertInboxItem();

  async function insertInbox() {
    insertInboxItem({content: insertFieldText});
    setInsertFieldText('');
    cacheInsertInputField('');
  }

  return (
    <div className="">
      <InsertPanelInputField {...{insertFieldText, setInsertFieldText}} />
      <InsertPanelControlls {...{insertInbox}} />
    </div>
  )
}

function InsertPanelInputField(props: { insertFieldText: string , setInsertFieldText: React.Dispatch<React.SetStateAction<string>>}) {
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

  return (
    <div className="flex justify-between">
      <BtnPrimary
        onClick={insertInbox}
      >Add</BtnPrimary>
      <BtnPrimary
        onClick={toggleFilterPanel}
      >Free</BtnPrimary>
    </div>
  )
}

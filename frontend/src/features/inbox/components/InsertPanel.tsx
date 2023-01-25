import { BtnPrimary } from "@/components/Buttons";
import { useState, useEffect } from "react";
import { useFilterPanelContext } from "../store/FilterPanelContext";
import { cacheInsertInputField, getCachedInsertInputField } from "../util/cacheInsertField";

export function InboxInsertPanel() {
  const [insertFieldText, setInsertFieldText] = useState('');

  async function insertInbox() {
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
    <textarea 
      value={insertFieldText} 
      onChange={e => { 
        setInsertFieldText(e.target.value); 
        cacheInsertInputField(e.target.value);
      }}
      className={`
        resize-none bg-tanj-white rounded-sm w-72 h-36 p-2 
        shadow-inner shadow-[rgba(0,0,0,0.2)] 
        border-2 border-tanj-pink focus:border-tanj-green outline-none 
      `} 
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

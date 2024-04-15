import { List } from "./components/List";
import { BiCheck } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { Textarea } from "@/components/form/Input";
import * as DraftEditorAPI from '@/features/DraftEditor/api';
import { Util } from "@/components/icons/UI";

export function ToDealList() {
  const [isToDealInputOpen, setIsToDealInputOpen] = useState(false);
  const [toDealInput, setToDealInput] = useState('');


  return (
    <div className="w-[26rem] h-full p-8 mx-10 flex flex-col rounded-sm">
      <div className="flex items-center">
        <h4 className="p-0 mb-1 inline text-tanj-green mr-4 align-middle">To deal:</h4>
        <AddToDealButtons {...{isToDealInputOpen, setIsToDealInputOpen ,toDealInput, setToDealInput}} />
      </div>
      <ToDealInput {...{isToDealInputOpen, toDealInput, setToDealInput}} />
      <List/>
    </div>
  )
}

function AddToDealButtons(props: {
  isToDealInputOpen: boolean, 
  setIsToDealInputOpen: (value: React.SetStateAction<boolean>) => void
  toDealInput: string, 
  setToDealInput: (value: React.SetStateAction<string>) => void
}) {
  const {isToDealInputOpen, setIsToDealInputOpen, toDealInput, setToDealInput} = props;
  const insertDraft = DraftEditorAPI.InsertDraft();

  return (
    <>
      <button
        className="border border-tanj-green border-opacity-30 opacity-50 hover:opacity-100 p-1 mr-2 rounded-sm transition-all"
        onClick={() => setIsToDealInputOpen(prev => !prev)}
      >
        {
          isToDealInputOpen ?
            <RxCross2 className="w-3 h-3 text-tanj-green" /> :
            <Util.plus className="w-3 h-3 fill-tanj-green" />
        }
      </button>
      {
        isToDealInputOpen && <button
          className="border border-tanj-green border-opacity-30 opacity-50 hover:opacity-100 p-1 mr-2 rounded-sm transition-all"
          onClick={() => {
            insertDraft({ content: toDealInput, to_deal: true });
            setIsToDealInputOpen(false);
            setToDealInput('');
          }}
        >
          <BiCheck className="w-3 h-3 fill-tanj-green" />
        </button>
      }
    </>
  )
}


function ToDealInput(props: {
  isToDealInputOpen: boolean, 
  toDealInput: string, 
  setToDealInput: (value: React.SetStateAction<string>) => void
}) {
  const {isToDealInputOpen, toDealInput, setToDealInput} = props;
  if (isToDealInputOpen)
    return (
      <div className="pt-2 pr-6">
        <Textarea
          className="resize-none w-full"
          value={toDealInput}
          onChange={e => setToDealInput(e.target.value)}
        />
      </div>
    )

  return null
}


import { List } from "./components/List";
import { FaPlus } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { Textarea } from "@/components/form/Input";
import * as InboxAPI from '@/features/inbox/api';

export function ToDealList() {
  const [isTodoInputOpen, setIsTodoInputOpen] = useState(false);
  const [toDealInput, setTodoInput] = useState('');


  return (
    <div className="w-[26rem] h-full p-8 mx-10 flex flex-col rounded-sm">
      <div className="flex items-center">
        <h4 className="p-0 mb-1 inline text-tanj-green mr-4 align-middle">Todo list</h4>
        <AddTodoButtons {...{isTodoInputOpen, setIsTodoInputOpen ,toDealInput, setTodoInput}} />
      </div>
      <TodoInput {...{isTodoInputOpen, toDealInput, setTodoInput}} />
      <List/>
    </div>
  )
}

function AddTodoButtons(props: {
  isTodoInputOpen: boolean, 
  setIsTodoInputOpen: (value: React.SetStateAction<boolean>) => void
  toDealInput: string, 
  setTodoInput: (value: React.SetStateAction<string>) => void
}) {
  const {isTodoInputOpen, setIsTodoInputOpen, toDealInput, setTodoInput} = props;
  const insertDraft = InboxAPI.InsertDraft();

  return (
    <>
      <button
        className="border border-tanj-green border-opacity-30 opacity-50 hover:opacity-100 p-1 mr-2 rounded-sm transition-all"
        onClick={() => setIsTodoInputOpen(prev => !prev)}
      >
        {
          isTodoInputOpen ?
            <RxCross2 className="w-3 h-3 text-tanj-green" /> :
            <FaPlus className="w-3 h-3 fill-tanj-green" />
        }
      </button>
      {
        isTodoInputOpen && <button
          className="border border-tanj-green border-opacity-30 opacity-50 hover:opacity-100 p-1 mr-2 rounded-sm transition-all"
          onClick={() => {
            insertDraft({ content: toDealInput, to_deal: true });
            setIsTodoInputOpen(false);
            setTodoInput('');
          }}
        >
          <BiCheck className="w-3 h-3 fill-tanj-green" />
        </button>
      }
    </>
  )
}


function TodoInput(props: {
  isTodoInputOpen: boolean, 
  toDealInput: string, 
  setTodoInput: (value: React.SetStateAction<string>) => void
}) {
  const {isTodoInputOpen, toDealInput, setTodoInput} = props;
  if (isTodoInputOpen)
    return (
      <div className="pt-2 pr-6">
        <Textarea
          className="resize-none w-full"
          value={toDealInput}
          onChange={e => setTodoInput(e.target.value)}
        />
      </div>
    )

  return null
}


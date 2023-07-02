import { List } from "./components/List";
import { FaPlus } from 'react-icons/fa';
import { BiCheck } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { Textarea } from "@/components/form/Input";
import * as InboxAPI from '@/features/inbox/api';

export function TodoList() {
  const [isTodoInputOpen, setIsTodoInputOpen] = useState(false);
  const [todoInput, setTodoInput] = useState('');


  return (
    <div className="w-[26rem] h-full p-8 mx-10 flex flex-col rounded-sm">
      <div className="flex items-center">
        <h4 className="p-0 mb-1 inline text-tanj-green mr-4 align-middle">Todo list</h4>
        <AddTodoButtons {...{isTodoInputOpen, setIsTodoInputOpen ,todoInput, setTodoInput}} />
      </div>
      <TodoInput {...{isTodoInputOpen, todoInput, setTodoInput}} />
      <List/>
    </div>
  )
}

function AddTodoButtons(props: {
  isTodoInputOpen: boolean, 
  setIsTodoInputOpen: (value: React.SetStateAction<boolean>) => void
  todoInput: string, 
  setTodoInput: (value: React.SetStateAction<string>) => void
}) {
  const {isTodoInputOpen, setIsTodoInputOpen, todoInput, setTodoInput} = props;
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
            insertDraft({ content: todoInput, todo: true });
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
  todoInput: string, 
  setTodoInput: (value: React.SetStateAction<string>) => void
}) {
  const {isTodoInputOpen, todoInput, setTodoInput} = props;
  if (isTodoInputOpen)
    return (
      <div className="pt-2 pr-6">
        <Textarea
          className="resize-none w-full"
          value={todoInput}
          onChange={e => setTodoInput(e.target.value)}
        />
      </div>
    )

  return null
}


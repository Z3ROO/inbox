import { FaCheck, FaTrashAlt } from "react-icons/fa";
import * as InboxAPI from '@/features/inbox/api';
import { IInboxItem } from "@/features/inbox/types";

export function Item({todo}: {todo: IInboxItem}) {
  const inboxItem_id = todo._id;
  const updateInboxItem = InboxAPI.UpdateInboxItem();
  const toggleTodo = InboxAPI.ToggleInboxTodo();

  return (
    <div className="relative p-4 my-4 to-tanj-gray from-tanj-brown bg-gradient-to-br rounded-sm w-full group">
      <span className="text-tanj-green hover:text-[#4dbf82] whitespace-pre-wrap">{todo.content}</span>
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 flex bg-tanj-gray bg-opacity-90 rounded-sm p-0.5">
        <FaCheck 
          className="m-1 cursor-pointer text-tanj-green opacity-40 hover:opacity-100" 
          onClick={() => {
            updateInboxItem({
              action: 'remove',
              inboxItem_id
            })
          }}
        />
        <FaTrashAlt 
          className="m-1 cursor-pointer text-tanj-pink opacity-40 hover:opacity-100" 
          onClick={() => {
            toggleTodo({
              inboxItem_id,
              state: false
            })
          }}
        />
      </div>
    </div>
  )
}


import { FaTrashAlt, FaCheck } from "react-icons/fa";
import * as InboxAPI from "@/features/inbox/api";
import { IInboxItem } from "../inbox/types";
export function Todo() {
  return (
    <div className="w-[26rem] h-full p-8 mx-10 flex flex-col rounded-sm">
      <h4 className="text-tanj-green">Todo list</h4>
      <TodoList/>
    </div>
  )
}

function TodoList() {
  const queryTodos = InboxAPI.QueryInboxTodos();

  if (queryTodos.isError)
    return <>Something went wrong</>;
  else if (queryTodos.isLoading)
    return <>Loading...</>
  else if (queryTodos.isIdle)
    return <>Idle...</>

  const todos = queryTodos.data;

  return (
    <div className="w-full h-full overflow-auto custom-scrollbar pr-6">
      {
        todos.map(todo => <TodoItem todo={todo} />)
      }
    </div>
  )
}

function TodoItem({todo}: {todo: IInboxItem}) {
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


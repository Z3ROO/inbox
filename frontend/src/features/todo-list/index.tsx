import { FaTrashAlt } from "react-icons/fa";

export function Todo() {
  return (
    <div className="w-[26rem] h-full p-8 mx-10 flex flex-col rounded-sm">
      <h4 className="text-tanj-green">Todo list</h4>
      <TodoList/>
    </div>
  )
}

function TodoList() {
  return (
    <div className="w-full h-full overflow-auto custom-scrollbar pr-6">
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  )
}

function TodoItem() {
  return (
    <div className="relative p-4 my-4 to-tanj-gray from-tanj-brown bg-gradient-to-br rounded-sm w-full group">
      <span className="text-tanj-green hover:text-[#4dbf82] ">SSomething to be done whenever possible.Something to be done whenever possible.Something to be done whenever possible.omething to be done whenever possible.</span>
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 flex hover:bg-tanj-gray bg-opacity-50 rounded-sm p-0.5">
        <FaTrashAlt className="m-1 cursor-pointer hover:text-tanj-green" />
        <FaTrashAlt className="m-1" />
      </div>
    </div>
  )
}


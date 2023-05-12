import { List } from "./components/List";

export function TodoList() {
  return (
    <div className="w-[26rem] h-full p-8 mx-10 flex flex-col rounded-sm">
      <h4 className="text-tanj-green">Todo list</h4>
      <List/>
    </div>
  )
}


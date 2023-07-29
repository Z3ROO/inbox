import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { Input, Textarea } from "@/components/form/Input";
import { useState } from "react";
import * as GoalsAPI from '@/features/goals/api';
import { InputList } from "@/components/form/InputList";

export function AddGoal({onSubmit}: { onSubmit: () => void}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskList, setTaskList] = useState<{value: string}[]>([])
  const addGoal = GoalsAPI.AddGoal();

  return (
    <div className="h-[78vh] w-screen max-w-3xl">
      <h3>Add Goal</h3>
      <form className="flex flex-col" id="add-goal" 
        onSubmit={(e) => {
          e.preventDefault();

          if (title.trim() === '' || description.trim() === '' || taskList.find(t => t.value.trim() === ''))
            return;

          addGoal({
            title,
            description,
            tasks: taskList.map( t => ({ description: t.value }))
          }, {
            onSuccess(){
              onSubmit()
            }
          });
        }
      }>
        <label>
          <div>Title: </div>
          <Input type="text" className="w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <div>Description: </div>
          <Textarea className="w-full resize-none h-24" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          <div>Task list: </div>
        </label>
          <InputList values={taskList} setValues={(data) => setTaskList(data)} />
      </form>
      <BtnPrimary form="add-goal">Insert</BtnPrimary>
    </div>
  );
}

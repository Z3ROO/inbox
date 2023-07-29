import { BtnPrimary, BtnSecondary } from "@/components/Buttons";
import { Input, Textarea } from "@/components/form/Input";
import { useState } from "react";
import * as GoalsAPI from '@/features/goals/api';
import { InputList } from "@/components/form/InputList";
import { IGoal } from "../types";

export function EditGoal({onSubmit, data}: { data: IGoal, onSubmit: () => void}) {

  return (
    <div className="h-[78vh] w-screen max-w-3xl">
      <h3>Edit Goal</h3>
      <Form {...{onSubmit, data}} />
      <BtnPrimary form="edit-goal">Insert</BtnPrimary>
    </div>
  );
}

function restructureTaskList(data: IGoal) {
  return data.tasks.map(
    ({description, _id}) => {
      return {_id, value: description}
    }) || []
}

function Form(props: { data: IGoal, onSubmit: () => void}) {
  const {onSubmit, data} = props;
  
  const [title, setTitle] = useState(data.description);
  const [description, setDescription] = useState(data.description);
  const [taskList, setTaskList] = useState<{_id: string|undefined, value: string}[]>(restructureTaskList(data));
  const [deletedTasks, setDeletedTasks] = useState<{_id: string, value: string}[]>([]);

  const editGoal = GoalsAPI.EditGoal();

  return (
      <form id="edit-goal" 
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          if (title.trim() === '' || description.trim() === '' || taskList.find(t => t.value.trim() === ''))
            return;

          editGoal({
            title,
            description,
            tasks: taskList.map( t => ({ _id: t._id, description: t.value })),
            deletedTasks: deletedTasks.map( t => ({ _id: t._id, description: t.value })),
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
        <div>Task list: </div>
        <InputList values={taskList} setValues={(data) => setTaskList(data)} 
          onDelete={(data) => {
            if (data._id !== undefined)
              setDeletedTasks(prev => {
                return prev.concat(data as { _id: string, value: string });
              });
          }}
        />
      </form>
  );
}

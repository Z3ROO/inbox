import { ITask, InsertTaskDTO } from "shared-types";
import { TasksRepository } from "./repository";
import { v4 as UUID } from "uuid";
import { PostgresRepositoryResponse } from "@/infra/database/PostgresRepository";
import { ServerError } from "@/util/error/ServerError";

export class Tasks{
  tasksRepo = new TasksRepository();

  public async getById(task_id: string) {
    const res = await this.tasksRepo.findById(task_id);
    return res.data;
  }

  public async getAll(): Promise<ITask[]> {
    const res = await this.tasksRepo.findAll();

    return res.data;
  }

  public async getTaskItems(parent_id: string) {
    const res = await this.tasksRepo.findTaskItems(parent_id);
    return res.data;
  }

  public async insertOne(props: InsertTaskDTO) {
    const task_id =  UUID()
    const res = await this.tasksRepo.insertOne({
      _id: task_id,
      title: props.title || '',
      content: props.content,
      subject_id: props.subject_id || null,
      priority: props.priority || 0,
      status: 'pending',
      created_at: new Date(),
      started_at: null,
      ended_at: null
    });

    if (props.parent_id)
      this.attachChild(props.parent_id, {type: 'existing', value: task_id})

    return res;
  }

  public async start(task_id: string) {
    const [task] = await this.getById(task_id);

    if (task.status !== 'pending')
      throw new ServerError('Task cant be started, current status: '+task.status, 400);
    
    if (await this.tasksRepo.isAnyInProgress())
      throw new ServerError('Task cant be started, another task already in progress.', 400);

    const res = await this.tasksRepo.updateOne(task_id, {started_at: new Date, status: 'in progress'});
    
    return res;
  }

  public async cancel(task_id: string) {
    const [task] = await this.getById(task_id);

    if (task.status === 'cancelled' || task.status === 'completed')
      throw new ServerError('Task cant be cancelled, current status: '+task.status);
      

    const res = await this.tasksRepo.updateOne(task_id, {ended_at: new Date(), status: 'cancelled'});
    return res;
  }

  public async complete(task_id: string) {
    const [task] = await this.getById(task_id);

    if (task.status === 'completed' || task.status === 'cancelled')
      throw new ServerError('Task cant be completed, current status: ' + task.status);

    const res = await this.tasksRepo.updateOne(task_id, {ended_at: new Date(), status: 'completed'});
    return res;
  }

  public async attachChild(parent_id: string, {type, value} : {type: 'new'|'existing', value: string}): Promise<PostgresRepositoryResponse<unknown>> {
    let res;
    if (type === 'existing')
      res = await this.tasksRepo.attachChild(parent_id, value);
    else if (type === 'new') {
      const {insertedId: child_id} = await this.insertOne({content:value});
      res = await this.tasksRepo.attachChild(parent_id, child_id);
    }
    return res;
  }

}
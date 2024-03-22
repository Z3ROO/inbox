import { PostgresRepository } from "@/infra/database/PostgresRepository";
import { Task_Schema } from "./types";
import { mapHandlers } from "../Drafts/repository";
import { ITask } from "shared-types";

export class TasksRepository extends PostgresRepository{
  public async findById(task_id: string) {
    const res = await this.query<ITask>(`
      SELECT ${TASK_PROP_FIELDS} from tasks 
      ${JOIN_SUBJECT} 
      WHERE tasks._id = $1;
    `,[task_id]);

    return res;
  }

  public async findAll() {
    const res = await this.query<ITask>(`
      SELECT ${TASK_PROP_FIELDS} from tasks 
      ${JOIN_SUBJECT} 
      WHERE (tasks.status = 'pending' OR tasks.status = 'in progress') 
      AND (NOT EXISTS (
        SELECT 1
        FROM task_items ti
        WHERE ti.child_task_id = tasks._id
      ));
    `);

    return res;
  }

  public async findTaskItems(parent_id: string) {
    const res = await this.query<ITask>(`
    SELECT ${TASK_PROP_FIELDS} FROM tasks 
    ${JOIN_SUBJECT} 
    JOIN task_items on tasks._id = task_items.child_task_id 
    WHERE task_items.parent_task_id = $1;
    `,[parent_id]);
    
    return res;
  }

  public async insertOne (task: Task_Schema) {
    const res = await this.query(`
      INSERT INTO tasks (
        _id, title, content, priority, subject_id, status, created_at, started_at, ended_at
      ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 );
    `, [
      task._id,
      task.title,
      task.content,
      task.priority,
      task.subject_id,
      task.status,
      task.created_at,
      task.started_at,
      task.ended_at
    ]);

    if (res.status === "OK")
      res.insertedId = task._id;

    return res;
  }

  public async updateOne(task_id: string, properties: Omit<Partial<Task_Schema>, 'created_at'|'_id'>) {
    const res = await this.query(`
    UPDATE tasks 
    SET ${mapHandlers(properties, 1)}
    WHERE tasks._id = $1;
  `, [task_id, ...Object.values(properties)]);
  
  return res;
  }

  public async attachChild(parent_id: string, child_id: string) {
    const res = await this.query(`
      INSERT INTO task_items (parent_task_id, child_task_id)
      VALUES ($1, $2);
    `, [parent_id, child_id]);

    return res;
  }

  public async isAnyInProgress(): Promise<boolean> {
    const res = await this.query<{exists: boolean}>(`
      SELECT EXISTS (
        SELECT 1 FROM tasks WHERE status = 'in progress'
      )
    `)
    
    return res.data[0]?.exists || false;
  }
}


const SUBJECT_PROP_AS_JSON = `
  jsonb_build_object(
    '_id', subjects._id, 
    'name', subjects.name, 
    'color', subjects.color, 
    'icon', subjects.icon
    ) as subject `;

const JOIN_SUBJECT = `
  LEFT JOIN subjects ON tasks.subject_id = subjects._id 
`

const TASK_PROP_FIELDS = `
  tasks._id, title, content, priority, status, created_at, started_at, ended_at ,
  ${SUBJECT_PROP_AS_JSON}`;
import { IGoal, INewGoal, ITask } from "@/types/Goals";
import { Repository } from "./inbox-repository";
import { ObjectId } from "mongodb";

export class GoalsRepo extends Repository<IGoal> {
  constructor() {
    super('kagura', 'goals');
  }
  
  public async findOne(goal_id: string) {
    const _id = new ObjectId(goal_id);
    return this.collection().findOne({_id});
  }
  
  public async findAll() {
    return this.collection().find().toArray();
  }

  public async findActive() {
    return this.collection().find({ active:true, finished: false }, {sort: {position: 1}}).toArray();
  }

  public async findQueued() {
    return this.collection().find({ active: false, finished: false }).toArray();
  }

  public async findFocused() {
    return this.collection().findOne({ focused: true });
  }

  public async updateGoal(goal_id: string, props: {
    title?: string
    description?: string
    active?: boolean
    focused?: boolean
    position?: number
    finished?: boolean
    activated_at?: Date|null
    finished_at?: Date|null
  }) {
    const _id = new ObjectId(goal_id);

    await this.collection().updateOne({_id}, {
      $set: {
        ...props
      }
    })
  }

  public async updateTask(goal_id: string, task_id: string, props: {
    description?: string
    complete?: boolean
    completed_at?: Date
  }) {
    const _id = new ObjectId(goal_id);
    const t_id = new ObjectId(task_id);

    const restructuredProps:any = {};
    for (let prop in props) {
      restructuredProps["tasks.$[task]."+prop] = props[prop];
    }

    return await this.collection().findOneAndUpdate({_id}, 
      {
        $set: {
          ...restructuredProps
        },
      },
      {
        arrayFilters: [{
          "task._id": t_id
        }],
        returnDocument: 'after'
      }
    )
  }

  public async insertGoal(props: INewGoal) {
    const { title, description } = props;
    const tasks: ITask[] = props.tasks.map(t => ({
      _id: new ObjectId(),
      description: t.description,
      complete: false,
      completed_at: null
    }));

    const lastGoalByPosition = await this.collection().findOne({}, { sort: { position: -1 } });
    let position: number;
    if (lastGoalByPosition)
      position = lastGoalByPosition.position < 5 ? 5 : lastGoalByPosition.position + 1;

    await this.collection().insertOne({
      title,
      description,
      active: false,
      focused: false,
      position,
      finished: false,
      created_at: new Date(),
      activated_at: null,
      finished_at: null,
      tasks
    })
  }

  public async insertTasks(goal_id: string, rawTasks: { description: string }[]) {
    const _id = new ObjectId(goal_id);
    const tasks: ITask[] = rawTasks.map(t => ({
      _id: new ObjectId(),
      description: t.description,
      complete: false,
      completed_at: null
    }));

    this.collection().updateOne({ _id }, { $push: {
      tasks: { $each: tasks }
    }})
  }

  public async deleteTasks(goal_id: string, tasks_ids: string[]) {
    const _id = new ObjectId(goal_id);
    const t_ids = tasks_ids.map(t_id => new ObjectId(t_id));

    this.collection().updateOne({ _id }, {
      $pull: {
        tasks: { 
          _id: { $in: t_ids}
        }
      }
    })
  }

  public async incrementInRange(range: {above?: number, under?: number, aboveEqual?: number, underEqual?: number}, amount: 1|-1) {
    const action: any = {};

    if (range.above !== undefined)
      action.$gt = range.above;
    
    if (range.under !== undefined)
      action.$lt = range.under;

    if (range.aboveEqual !== undefined)
      action.$gte = range.aboveEqual;
    
    if (range.underEqual !== undefined)
      action.$lte = range.underEqual;

    this.collection().updateMany({position: action}, {$inc: { position: amount }});
  }

  public async deleteGoal(goal_id: string) {
    const _id = new ObjectId(goal_id);

    await this.collection().deleteOne({_id});
  }

  public async deleteGoals(goal_ids: string[]) {
    const _ids = goal_ids.map( _id => new ObjectId(_id));

    await this.collection().deleteMany({_id: { $in: _ids }});
  }
  
}
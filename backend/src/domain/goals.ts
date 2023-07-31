import { GoalsRepo } from "@/repository/goals-repository";
import { EditGoalDTO, INewGoal, ITask } from "@/types/Goals";
import { ClientError } from "@/util/error/ClientError";

export class Goals {
  repository = new GoalsRepo();

  public async getGoal(goal_id: string) {
    return this.repository.findOne(goal_id);
  }

  public async getFocused() {
    return this.repository.findFocused();
  }

  public async getGoals() {
    return this.repository.findAll();
  }

  public async getActiveGoals() {
    return this.repository.findActive();
  }

  public async getQueuedGoals() {
    return this.repository.findQueued();
  }

  public async completeTask({goal_id, task_id, state}: {goal_id: string, task_id: string, state: boolean}) {

    const result = await this.repository.updateTask(goal_id, task_id, {
      complete: state,
      completed_at: state ? new Date() : null
    });

    return { currentState: state, task_id };
  }
  
  public async activateGoal(goal_id: string) {
    const activeGoals = await this.getActiveGoals();
    const goal = await this.getGoal(goal_id);
    
    if (goal.active)
      throw new Error('Goal Already active');

    if (activeGoals.length === 5)
      throw new Error('Maximum active goals already reached!');

    const availablePosition: number = activeGoals.reduce((acc, val) => { 
      if (acc === val.position)
        return acc+1;

      return acc;
    }, 0);

    await this.repository.updateGoal(goal_id, {
      active: true,
      position: availablePosition,
      activated_at: new Date()
    });

    //fix queued goals positions
    await this.repository.incrementInRange({aboveEqual: goal.position}, -1);
  }

  public async deactivateGoal(goal_id: string) {
    // As for now and probably beyond goals are not deactivatable.
  }
  
  public async focusGoal(goal_id: string) {
    const goal = await this.getGoal(goal_id);

    if (goal.focused)
      throw new Error('Goal Already focused!');

    if (!goal.active)
      throw new Error('Goal must but active to be focused!');
      
    const focusedGoal = await this.getFocused();
    if (focusedGoal) {
      await this.repository.updateGoal(focusedGoal._id.toHexString(), {
        focused: false
      });
    }
    
    await this.repository.updateGoal(goal_id, {
      focused: true
    })

  }

  public async unfocusGoal(goal_id: string) {
    const goal = await this.getGoal(goal_id);

    if (!goal.focused)
      throw new Error('Goal Already unfocused!');

    if (!goal.active)
      throw new Error('Goal must but active to be unfocused!');
    
    await this.repository.updateGoal(goal_id, {
      focused: false
    });

  }

  public async finishGoal(goal_id: string) {
    const goal = await this.getGoal(goal_id);

    if (goal.finished)
      throw new Error('Goal already finished.');
    
    if (goal.tasks.find(task => task.complete === false))
      throw new Error('All tasks must be completed.');

    await this.repository.updateGoal(goal_id, {
      finished: true,
      finished_at: new Date(),
      focused: false,
      active: false,
      position: null
    });

    if (goal.position < 5)
      await this.repository.incrementInRange({aboveEqual: goal.position, underEqual: 4}, -1);
    else if (goal.position >= 5)
      await this.repository.incrementInRange({aboveEqual: goal.position}, -1);
  }

  public async createGoal(props: INewGoal) {
    const { title, description, tasks } = props;

    await this.repository.insertGoal({title, description, tasks});

  }

  public async editGoal(props: EditGoalDTO) {
    const { _id, title, description, tasks, deletedTasks } = props;

    const update: any = {};
    console.log(props)
    if (title)
      update.title = title;
    if (description)
      update.description = description;

    await this.repository.updateGoal(_id, update);

    if (tasks) {
      const newTasks = tasks.filter(task => task._id === undefined);
      if (newTasks.length > 0)
        await this.repository.insertTasks(_id, newTasks);

      const existingTasks = tasks.filter(task => task._id);
      for await (let task of existingTasks) {
        await this.repository.updateTask(_id, task._id, {
          description: task.description
        });
      }
    }

    if (deletedTasks && deletedTasks.length > 0)
      await this.repository.deleteTasks(_id, deletedTasks);

  }

  public async deleteGoal(goal_id: string) {
    const goal = await this.getGoal(goal_id);

    if (!goal)
      throw new ClientError('Goal not found.', 400);
    
    await this.repository.deleteGoal(goal_id);

    if (goal.position < 5)
      await this.repository.incrementInRange({aboveEqual: goal.position, underEqual: 4}, -1);
    else if (goal.position >= 5)
      await this.repository.incrementInRange({aboveEqual: goal.position}, -1);
  }
}
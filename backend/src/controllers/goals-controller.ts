import { Goals } from '@/domain/goals';
import { ErrorHandler } from '@/infra/http-server/config/ErrorHandler';
import { EditGoalDTO } from '@/types/Goals';
import { Request, Response, Router } from 'express';

const router = Router();
const goals = new Goals();

const routes = [
  {
    method: 'get',
    path: '/',
    handler: async (req: Request, res: Response) => {
      const allGoals = await goals.getGoals();
      res.json(allGoals);
    }
  },
  {
    method: 'get',
    path: '/queued',
    handler: async (req: Request, res: Response) => {
      const queuedGoals = await goals.getQueuedGoals();
      res.json(queuedGoals);
    }
  },
  {
    method: 'get',
    path: '/active',
    handler: async (req: Request, res: Response) => {
      const activeGoals = await goals.getActiveGoals();
      res.json(activeGoals);
    }
  },
  {
    method: 'get',
    path: '/focused',
    handler: async (req: Request, res: Response) => {
      const focusedGoal = await goals.getFocused();
      res.json(focusedGoal);
    }
  },
  {
    method: 'post',
    path: '/new',
    handler: async (req: Request, res: Response) => {
      const { 
        title,
        description,
        tasks
      } = req.body;
    
      await goals.createGoal({ title, description, tasks });
    
      res.json({});
    }
  },
  {
    method: 'put',
    path: '/task/complete',
    handler: async (req: Request, res: Response) => {
      const { goal_id, task_id, state } = req.body;
      const result = await goals.completeTask({ goal_id, task_id, state });
    
      res.json(result);
    }
  },
  {
    method: 'get',
    path: '/activate/:goal_id',
    handler: async (req: Request, res: Response) => {
      const { goal_id } = req.params;
      await goals.activateGoal(goal_id);
    
      res.json({});
    }
  },
  {
    method: 'get',
    path: '/focus/:goal_id',
    handler: async (req: Request, res: Response) => {
      const { goal_id } = req.params;
      await goals.focusGoal(goal_id);
    
      res.json({});
    }
  },
  {
    method: 'get',
    path: '/unfocus/:goal_id',
    handler: async (req: Request, res: Response) => {
      const { goal_id } = req.params;
      await goals.unfocusGoal(goal_id);
    
      res.json({});
    }
  },
  {
    method: 'put',
    path: '/edit',
    handler: async (req: Request, res: Response) => {
      const { _id, title, description, tasks, deletedTasks }: EditGoalDTO = req.body;
      await goals.editGoal({
        _id,
        title,
        description,
        tasks, 
        deletedTasks
      });
    
      res.json({});
    }
  },
  {
    method: 'get',
    path: '/finish/:goal_id',
    handler: async (req: Request, res: Response) => {
      const { goal_id } = req.params;
      await goals.finishGoal(goal_id);
    
      res.json({});
    }
  },
  {
    method: 'delete',
    path: '/:goal_id',
    handler: async (req: Request, res: Response) => {
      const { goal_id } = req.params;
      await goals.deleteGoal(goal_id);
    
      res.json({});
    }
  }
]

for (let route of routes) {
  router[route.method](route.path, ErrorHandler(route.handler));
}

export default router
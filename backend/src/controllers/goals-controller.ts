import { Goals } from '@/domain/goals';
import { EditGoalDTO } from '@/types/Goals';
import { Request, Response, Router } from 'express';

const router = Router();
const goals = new Goals();

router.get('/', async (req: Request, res: Response) => {
  const allGoals = await goals.getGoals();
  res.json(allGoals);
});

router.get('/queued', async (req: Request, res: Response) => {
  const queuedGoals = await goals.getQueuedGoals();
  res.json(queuedGoals);
});

router.get('/active', async (req: Request, res: Response) => {
  const activeGoals = await goals.getActiveGoals();
  res.json(activeGoals);
});

router.get('/focused', async (req: Request, res: Response) => {
  const focusedGoal = await goals.getFocused();
  res.json(focusedGoal);
});

router.put('/task/complete', async (req: Request, res: Response) => {
  const { goal_id, task_id, state } = req.body;
  const result = await goals.completeTask({ goal_id, task_id, state });

  res.json(result);
});

router.get('/activate/:goal_id', async (req: Request, res: Response) => {
  const { goal_id } = req.params;
  await goals.activateGoal(goal_id);

  res.json({});
});

router.get('/focus/:goal_id', async (req: Request, res: Response) => {
  const { goal_id } = req.params;
  await goals.focusGoal(goal_id);

  res.json({});
});

router.get('/unfocus/:goal_id', async (req: Request, res: Response) => {
  const { goal_id } = req.params;
  await goals.unfocusGoal(goal_id);

  res.json({});
});

router.get('/finish/:goal_id', async (req: Request, res: Response) => {
  const { goal_id } = req.params;
  await goals.finishGoal(goal_id);

  res.json({});
});

router.post('/new', async (req: Request, res: Response) => {
  const { 
    title,
    description,
    tasks
  } = req.body;

  await goals.createGoal({ title, description, tasks });

  res.json({});
});

router.put('/edit', async (req: Request, res: Response) => {
  const { _id, title, description, tasks, deletedTasks }: EditGoalDTO = req.body;
  await goals.editGoal({
    _id,
    title,
    description,
    tasks, 
    deletedTasks
  });

  res.json({});
})

router.delete('/:goal_id', async (req: Request, res: Response) => {
  const { goal_id } = req.params;
  await goals.deleteGoal(goal_id);

  res.json({});
});

export default router
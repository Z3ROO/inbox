import CustomRouter from "@/lib/expressjs/CustomRouter";
import { Request } from "express";
import { APIResponse, ActOnTaskDTO, AttachTaskItemDTO, ITask, InsertTaskDTO } from "shared-types";
import { Tasks } from ".";

const router = new CustomRouter();
const tasks = new Tasks();

type GetTasksRequest = Request<{}, APIResponse<ITask[]>, {}, {}>

router.get('/', async (req: GetTasksRequest, res) => {
  const allTasks = await tasks.getAll();
  res.json({
    success: true,
    statusCode: 200,
    data: allTasks,
    message: ''
  });
});

type GetTaskItemsRequest = Request<{task_id: string}, APIResponse<ITask[]>, {}, {}>

router.get('/items/:task_id', async (req: GetTaskItemsRequest, res) => {
  const { task_id } = req.params;
  const taskItems = await tasks.getTaskItems(task_id);

  res.json({
    success: true,
    statusCode: 200,
    data: taskItems,
    message: ''
  });
});

type PostInsertTaskRequest = Request<{}, APIResponse, InsertTaskDTO, {}>

router.post('/', async (req: PostInsertTaskRequest, res) => {
  const { content, priority, subject_id, title, parent_id } = req.body;
  await tasks.insertOne({ content, priority, subject_id, title, parent_id })
  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
});

type PutAttachChildRequest = Request<{}, APIResponse, AttachTaskItemDTO, {}>

router.put('/attach', async (req: PutAttachChildRequest, res) => {
  const { draft_id, type, value } = req.body;
  await tasks.attachChild(draft_id, { type, value });
  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
})

type PostActionOnTaskRequest = Request<{}, APIResponse, ActOnTaskDTO, {}>;

router.post('/action', async (req: PostActionOnTaskRequest, res) => {
  const { action, task_id } = req.body;
  
  if (action === 'cancelled')
    await tasks.cancel(task_id);
  else if (action === 'in progress')
    await tasks.start(task_id);
  else if (action === 'completed')
    await tasks.complete(task_id);

  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
});

export default router.router;
import { Inbox } from "@/domain/inbox";
import { Router } from 'express'
  
export const router = Router();
const inbox = new Inbox();

router.get('/inbox', async (request, response) => {
  const drafts = await inbox.getInbox();
  response.json(drafts);
});

router.get('/inbox/todos', async (request, response) => {
  const inboxTodos = await inbox.getTodos();
  response.json(inboxTodos);
});

router.post('/inbox', async (request, response) => {
  const { content } = request.body;
  await inbox.insertDraft(content);
  
  response.status(200).json([])
})

router.put('/inbox', async (request, response) => {
  const { action, draft_id, content, quantity } = request.body;
  try {
    if (action === 'undo')
      await inbox.undoChange();
    else if (action === 'remove')
      await inbox.removeDraft(draft_id);
    else
      await inbox.delayDraft({_id: draft_id, content, amount: action, quantity});

    response.status(200).json([]);
  }catch(err){
    response.status(500).json([]);
  }  
});

router.put('/inbox/todos', async (request, response) => {
  const { draft_id, state } = request.body;
  console.log(request.body);
  try {
    if (state === true)
      await inbox.toggleTodo(draft_id, true);
    else
      await inbox.toggleTodo(draft_id, false);

    response.status(200).json([]);
  }
  catch(err) {
    response.status(500).json([]);
  }
});


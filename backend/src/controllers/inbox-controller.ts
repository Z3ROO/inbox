import { Inbox } from "@/domain/inbox";
import { Router } from 'express'
  
export const router = Router();
const inbox = new Inbox();

router.get('/inbox', async (request, response) => {
  const inboxItems = await inbox.getItems();
  response.json(inboxItems);
});

router.get('/inbox/todos', async (request, response) => {
  const inboxTodos = await inbox.getTodos();
  response.json(inboxTodos);
});

router.post('/inbox', async (request, response) => {
  const { content } = request.body;
  await inbox.insertItem(content);
  
  response.status(200).json([])
})

router.put('/inbox', async (request, response) => {
  const { action, item_id, content, quantity } = request.body;
  try {
    if (action === 'undo')
      await inbox.undoChange();
    else if (action === 'remove')
      await inbox.removeItem(item_id);
    else
      await inbox.delayItem({_id: item_id, content, amount: action, quantity});

    response.status(200).json([]);
  }catch(err){
    response.status(500).json([]);
  }  
});

router.put('/inbox/todos', async (request, response) => {
  const { item_id, state } = request.body;
  console.log(request.body);
  try {
    if (state === true)
      await inbox.toggleTodo(item_id, true);
    else
      await inbox.toggleTodo(item_id, false);

    response.status(200).json([]);
  }
  catch(err) {
    response.status(500).json([]);
  }
});


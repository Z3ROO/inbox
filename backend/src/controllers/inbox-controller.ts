import { Inbox } from "@/domain/inbox";
import { Router } from 'express'

export const router = Router();
const inbox = new Inbox();

router.get('/inbox', async (request, response) => {
  const inboxItems = await inbox.getItems();
  response.json(inboxItems);
});

router.post('/inbox', async (request, response) => {
  const { content } = request.body
  await inbox.insertItem(content);
  console.log(content)
  response.send(200)
})

router.put('/inbox', async (request, response) => {
  const { action, item_id, content } = request.body;
  try {
    if (action === 'undo')
      await inbox.undoChange();
    if (action === 'remove')
      await inbox.removeItem(item_id);
    else
      await inbox.delayItem({_id: item_id, content, amount: action});

    response.status(200).send();
  }catch(err){
    response.status(500).send();
  }  
});

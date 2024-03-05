import { Inbox } from "@/core/inbox";
import { IDraft, IDraft_Old } from "@/types/Inbox";
import { Router } from 'express'
  
const router = Router();
const inbox = new Inbox();

router.get('/', async (request, response) => {
  const drafts = await inbox.getInbox();
  const tranformedDrafts: IDraft_Old[] = transformDraftsBodyStructure(drafts)
  response.json(tranformedDrafts);
});

router.get('/todos', async (request, response) => {
  const inboxTodos = await inbox.getTodos();
  const tranformedDrafts: IDraft_Old[] = transformDraftsBodyStructure(inboxTodos)
  response.json(tranformedDrafts);
});

router.get('/categories', async (request, response) => {
  const inboxCategories = await inbox.getCategories();
  response.json(inboxCategories);
});

router.post('/', async (request, response) => {
  const { content, priority, category, todo } = request.body;
  await inbox.insertDraft(content, priority, category, todo);
  
  response.status(200).json([])
})

router.put('/', async (request, response) => {
  const { action, draft_id, content, quantity, priority, category } = request.body;
  try {
    if (action === 'undo')
      await inbox.undoChange();
    else if (action === 'remove')
      await inbox.removeDraft(draft_id);
    else if (action === 'organization')
      await inbox.updateDraftOrganization({_id: draft_id, priority, category, content});
    else
      await inbox.delayDraft({_id: draft_id, content, amount: action, quantity});

    response.status(200).json([]);
  }catch(err){
    response.status(500).json([]);
  }  
});

router.put('/todos', async (request, response) => {
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

export default router

function transformDraftsBodyStructure(drafts: IDraft[]): IDraft_Old[] {
  const tranformedDrafts = drafts.map(draft => {
      return {
        ...draft,
        todo: draft.to_deal,
        last_delay: {
          amount: draft.delay,
          quantity: draft.delay_quantity,
          delayed_at: draft.delayed_at
        }
      }
    })

  return tranformedDrafts;
}
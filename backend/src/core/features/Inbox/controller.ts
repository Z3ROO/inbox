import { Inbox } from "@/core/features/Inbox";
import { IDraft, IDraft_Old } from "@/types/Inbox";
import { Router } from 'express'
  
const router = Router();
const inbox = new Inbox();

router.get('/', async (request, response) => {
  const drafts = await inbox.getDrafts();
  const tranformedDrafts: IDraft_Old[] = transformDraftsBodyStructure(drafts)
  response.json(tranformedDrafts);
});

// router.get('/categories', async (request, response) => {
//   const categories = await inbox.getAllDraftCategories();
//   response.json(categories);
// });

// router.post('/', async (request, response) => {
//   const { content, priority, category, todo } = request.body;
//   await inbox.insertDraft(content, priority, category, todo);
  
//   response.status(200).json([])
// })

router.put('/', async (request, response) => {
  const { action, draft_id, content, quantity, priority, category } = request.body;
  try {
    // if (action === 'undo')
    //   await inbox.undoChange();
    // else 
    if (action === 'remove')
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
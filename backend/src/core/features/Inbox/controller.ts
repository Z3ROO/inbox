import { Inbox } from "@/core/features/Inbox";
import { Router } from 'express'
  
const router = Router();
const inbox = new Inbox();

router.get('/', async (request, response) => {
  const drafts = await inbox.getDrafts();
  response.json(drafts);
});

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
import { Inbox } from "@/core/features/Inbox";
import { Request, Router } from 'express';
import { APIResponse, DraftUpdateDTO, IDraft } from 'shared-types';
  
const router = Router();
const inbox = new Inbox();

type GetInboxDraftsRequest = Request<{}, APIResponse<IDraft[]>, {}, {}>

router.get('/', async (request: GetInboxDraftsRequest, response) => {
  const drafts = await inbox.getDrafts();

  response.json({
    success: true,
    statusCode: 200,
    data: drafts,
    message: ''
  });
});

type PutUpdateDraftRequest = Request<{}, APIResponse, DraftUpdateDTO, {}>

router.put('/', async (request: PutUpdateDraftRequest, response) => {
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

    response.status(200).json({
      success: true,
      statusCode: 200,
      data: null,
      message: ''
    });
  }catch(err){
    response.status(500).json({
      success: false,
      statusCode: 500,
      data: null,
      message: ''
    });
  }  
});

export default router
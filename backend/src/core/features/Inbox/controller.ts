import { Inbox } from "@/core/features/Inbox";
import CustomRouter from "@/lib/expressjs/CustomRouter";
import { Request } from 'express';
import { APIResponse, DraftUpdateDTO, IDraft } from 'shared-types';
  
// const router = Router();
const router = new CustomRouter();
const inbox = new Inbox();


type GetInboxDraftsRequest = Request<{}, APIResponse<IDraft[]>, {}, {}>;

router.get('/', async (request: GetInboxDraftsRequest, response, next) => {
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
  const { action, draft_id, title, content, quantity, priority, subject } = request.body;

  try {
    // if (action === 'undo')
    //   await inbox.undoChange();
    // else 
    if (action === 'remove')
      await inbox.removeDraft(draft_id);
    else if (action === 'organization')
      await inbox.updateDraftOrganization({title, _id: draft_id, priority, subject, content});
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

export default router.router
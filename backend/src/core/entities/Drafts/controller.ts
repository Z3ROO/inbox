import { Request } from 'express';
import { Drafts } from '.';
import { APIResponse, IDraft, InsertDraftDTO, AttachDraftItemDTO, DeleteDraftItemDTO } from 'shared-types';
import CustomRouter from '@/lib/expressjs/CustomRouter';

const router = new CustomRouter();
//Route:drafts

const drafts = new Drafts();

type GetSearchDraftsRequest = Request<{}, APIResponse<IDraft[]>, {}, {s: string}>;

router.get('/search', async (req: GetSearchDraftsRequest, res) => {
  const { s } = req.query;
  
  const foundDrafts = await drafts.searchDrafts(s);
  
  res.json({
    success: true,
    statusCode: 200,
    data: foundDrafts,
    message: ''
  })
})

type GetDraftItemsRequest = Request<{parent_id: string}, APIResponse<IDraft[]>, {}, {}>

router.get('/items/:parent_id', async (req: GetDraftItemsRequest, res) => {
  const { parent_id } = req.params;
  const draftItems = await drafts.getDraftItems(parent_id)
  res.json({
    success: true,
    statusCode: 200,
    data: draftItems,
    message: ''
  })
});

type GetDraftToTaskRequest = Request<{draft_id: string}, APIResponse, {}, {}>

router.get('/to-task/:draft_id', async (req: GetDraftToTaskRequest, res) => {
  const { draft_id } = req.params;
  await drafts.toTask(draft_id);

  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
})

type PostAttachDraftItemsRequest = Request<{}, APIResponse, AttachDraftItemDTO, {}>;

router.post('/items/attach', async (req: PostAttachDraftItemsRequest, res) => {
  const { draft_id, type, value } = req.body;

  await drafts.attachDraftItems(draft_id, {type, value})
  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  })
})


type InsertDraftRequest = Request<{}, APIResponse, InsertDraftDTO, {}>

router.post('/insert', async (request: InsertDraftRequest, response) => {
  const { title, content, priority, subject, to_deal, draft_items } = request.body;
  await drafts.insertOne({title, content, priority, subject, to_deal, draft_items});
  
  response.status(200).json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
})

type DeleteDraftItemsRequest = Request<{}, APIResponse, DeleteDraftItemDTO, {}>

router.delete('/items', async (req: DeleteDraftItemsRequest, res) => {
  const { type, parent_draft_id, child_draft_id } = req.body;
  console.log(req.body);
  if (type === 'delete')
    await drafts.deleteOne(child_draft_id);
  else if (type === 'unlink')
    await drafts.detachDraftItem(parent_draft_id, child_draft_id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
});
})

export default router.router;
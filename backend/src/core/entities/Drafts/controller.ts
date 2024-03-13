import { Request } from 'express';
import { Drafts } from '.';
import { APIResponse, IDraft, InsertDraftDTO } from 'shared-types';
import CustomRouter from '@/lib/expressjs/CustomRouter';

const router = new CustomRouter();
//Route:drafts

const drafts = new Drafts();

type GetDraftItemsRequest = Request<{parent_id: string}, APIResponse<IDraft[]>, {}, {}>

type GetSearchDraftsRequest = Request<{}, APIResponse<IDraft[]>, {}, {s: string}>;

router.get('/search', async (req: GetSearchDraftsRequest, res) => {
  const { s } = req.query;
  console.log(req.query)
  const foundDrafts = await drafts.searchDrafts(s);
  
  res.json({
    success: true,
    statusCode: 200,
    data: foundDrafts,
    message: ''
  })
})

router.get('/draft-items/:parent_id', async (req: GetDraftItemsRequest, res) => {
  const { parent_id } = req.params;
  const draftItems = await drafts.getDraftItems(parent_id)
  res.json({
    success: true,
    statusCode: 200,
    data: draftItems,
    message: ''
  })
});


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

export default router.router;
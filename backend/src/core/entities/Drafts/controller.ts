import { Request, Router } from 'express';
import { Drafts } from '.';
import { APIResponse, InsertDraftDTO } from 'shared-types';

const router = Router();
//Route:drafts

const drafts = new Drafts();

type InsertDraftRequest = Request<{}, APIResponse, InsertDraftDTO, {}>

router.post('/insert', async (request: InsertDraftRequest, response) => {
  const { content, priority, category, to_deal } = request.body;
  await drafts.insertOne({content, priority, category, to_deal});
  
  response.status(200).json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
})

export default router;
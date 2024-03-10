import { Request } from 'express';
import { Drafts } from '.';
import { APIResponse, InsertDraftDTO } from 'shared-types';
import CustomRouter from '@/lib/expressjs/CustomRouter';

const router = new CustomRouter();
//Route:drafts

const drafts = new Drafts();

type InsertDraftRequest = Request<{}, APIResponse, InsertDraftDTO, {}>

router.post('/insert', async (request: InsertDraftRequest, response) => {
  const { content, priority, subject, to_deal } = request.body;
  await drafts.insertOne({content, priority, subject, to_deal});
  
  response.status(200).json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
})

export default router.router;
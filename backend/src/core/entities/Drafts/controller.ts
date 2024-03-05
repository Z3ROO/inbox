import { Router } from 'express';
import { Drafts } from '.';

const router = Router();
//Route:drafts

const drafts = new Drafts();

router.post('/insert', async (request, response) => {
  const { content, priority, category, to_deal } = request.body;
  await drafts.insertOne(content, priority, category, to_deal);
  
  response.status(200).json([])
})

export default router;
import { Router } from 'express';
import { Drafts } from '.';

const router = Router();
//Route:drafts

const drafts = new Drafts();

router.post('/insert', async (request, response) => {
  const { content, priority, category, todo } = request.body;
  await drafts.insertOne(content, priority, category, todo);
  
  response.status(200).json([])
})

export default router;
import { Response, Router } from 'express';
import { DraftCategories } from '.';
import { IDraftCategory } from '@/types/Inbox';

const router = Router();
//Route:draft_categories

const draftCategories = new DraftCategories();

router.get(``, async (req, res:Response<IDraftCategory[]>) => {
  const categories = await draftCategories.getAll();
  res.json(categories);
});

router.post(`insert`, async (req, res) => {
  const { name } = req.body;
  await draftCategories.insertOne({name});
  res.json({});
});

export default router
import { Router } from 'express';
import { DraftCategories } from '.';

const router = Router();
//Route:draft_categories

const draftCategories = new DraftCategories();

router.get(``, async (req, res) => {
  const categories = await draftCategories.getAll();
  res.json({categories});
})

router.post(`insert`, async (req, res) => {
  const { name } = req.body;
  await draftCategories.insertOne({name});
})

export default router
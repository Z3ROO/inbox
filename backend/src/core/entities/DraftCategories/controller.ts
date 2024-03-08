import { Request, Router } from 'express';
import { DraftCategories } from '.';
import { APIResponse, IDraftCategory, DraftCategoryDTO } from 'shared-types';

const router = Router();
//Route:draft_categories

const draftCategories = new DraftCategories();

type GetDraftCategoriesRequest = Request<{}, APIResponse<IDraftCategory[]>, {}, {}>

router.get(``, async (req: GetDraftCategoriesRequest, res) => {
  const categories = await draftCategories.getAll();
  res.json({
    success: true,
    statusCode: 200,
    data: categories,
    message: ''
  });
});

type PostInsertDraftCategoriesRequest = Request<{}, APIResponse, DraftCategoryDTO, {}>

router.post(`insert`, async (req: PostInsertDraftCategoriesRequest, res) => {
  const { name } = req.body;
  await draftCategories.insertOne({name});
  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
});

export default router
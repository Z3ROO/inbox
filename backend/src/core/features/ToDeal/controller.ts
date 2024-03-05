import { ToDeal } from "@/core/features/ToDeal";
import { IDraft, IDraft_Old } from "@/types/Inbox";
import { Router } from 'express'
  
const router = Router();
const toDeal = new ToDeal();


router.get('/', async (request, response) => {
  const draftsToDeal = await toDeal.getDrafts();
  const tranformedDrafts: IDraft_Old[] = transformDraftsBodyStructure(draftsToDeal)
  response.json(tranformedDrafts);
});

router.get('/categories', async (request, response) => {
  const categories = await toDeal.getAllDraftCategories();
  response.json(categories);
});

router.put('/toggle', async (request, response) => {
  const { draft_id, state } = request.body;
  
  try {
    if (state === true)
      await toDeal.toggle(draft_id, true);
    else
      await toDeal.toggle(draft_id, false);

    response.status(200).json([]);
  }
  catch(err) {
    response.status(500).json([]);
  }
});

export default router

function transformDraftsBodyStructure(drafts: IDraft[]): IDraft_Old[] {
  const tranformedDrafts = drafts.map(draft => {
      return {
        ...draft,
        todo: draft.to_deal,
        last_delay: {
          amount: draft.delay,
          quantity: draft.delay_quantity,
          delayed_at: draft.delayed_at
        }
      }
    })

  return tranformedDrafts;
}
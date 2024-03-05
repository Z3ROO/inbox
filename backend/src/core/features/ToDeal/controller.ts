import { ToDeal } from "@/core/features/ToDeal";
import { Router } from 'express'
  
const router = Router();
const toDeal = new ToDeal();


router.get('/', async (request, response) => {
  const draftsToDeal = await toDeal.getDrafts();

  response.json(draftsToDeal);
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

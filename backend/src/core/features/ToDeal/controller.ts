import { ToDeal } from "@/core/features/ToDeal";
import { APIResponse, IDraft, ToggleToDealDTO } from "shared-types";
import { Request, Response } from 'express'
import CustomRouter from "@/lib/expressjs/CustomRouter";
  
//const router = Router();
const router = new CustomRouter();
const toDeal = new ToDeal();


router.get('/', async (request, response: Response<APIResponse<IDraft[]>>) => {
  const draftsToDeal = await toDeal.getDrafts();

  response.json({
    success: true,
    statusCode: 200,
    data: draftsToDeal,
    message: ''
  });
});

type PutToggleToDealRequest = Request<{}, APIResponse, ToggleToDealDTO, {}>
console.log('review all routes error handling')
router.put('/toggle', async (request: PutToggleToDealRequest, response) => {
  const { draft_id, state } = request.body;
  
  try {
    if (state === true)
      await toDeal.toggle(draft_id, true);
    else
      await toDeal.toggle(draft_id, false);

    response.status(200).json({
      success: true,
      data: null,
      statusCode: 200,
      message: ''
    });
  }
  catch(err) {
    response.status(500).json({
      success: false,
      data: null,
      statusCode: 500,
      message: ''
    });
  }
});

export default router.router

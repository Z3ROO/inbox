import { API_URL } from "@/config/API";
import { useMutation, MutationOptions } from "@/lib/query";

export type EvaluateCardDTO = {card_id: string, note: -1|0|1, started_at: Date, finished_at: Date}

async function evaluateCard(args: EvaluateCardDTO): Promise<{}> {
  const request = await fetch(API_URL+'/rehearsal/eval', {
    method: 'put',
    body: JSON.stringify({
      _id: args.card_id,
      history: {
        direction: args.note,
        started_at: args.started_at,
        finished_at: args.finished_at
      }
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const response = request.json();

  return response;
}

export function EvaluateCard(options?: MutationOptions<{}, EvaluateCardDTO> ) {
  return useMutation(evaluateCard, {
    ...options,
    
  });
}

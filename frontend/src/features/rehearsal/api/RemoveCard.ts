import { API_URL } from "@/config/API";
import { MutationOptions, useMutation } from "@/lib/query";

export type RemoveCardDTO = {card_id: string}

async function removeCard({card_id}: RemoveCardDTO): Promise<{}> {
  const request = await fetch(API_URL+'/rehearsal/card', {
    method: 'delete',
    body: JSON.stringify({ card_id }),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const response = request.json();

  return response;
}

export function RemoveCard(options?: MutationOptions<{}, RemoveCardDTO>) {
  
  return useMutation(removeCard, {
    ...options
  });
}


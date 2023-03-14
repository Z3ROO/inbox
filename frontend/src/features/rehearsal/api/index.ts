import { IKagura, KaguraCardDTO, KaguraMetaData } from "../types";
import { API_URL } from "@/config/API";

export async function getKagura(): Promise<IKagura[]> {
  const request = await fetch(API_URL+'/kagura');
  const response = request.json();

  return response;
}

export async function getKaguraMetaData(): Promise<KaguraMetaData> {
  const request = await fetch(API_URL+'/kagura/meta');
  const response = request.json();

  return response;
}

export async function evaluateCard(args: {card_id: string, note: -1|0|1, started_at: Date, finished_at: Date}): Promise<void> {
  const request = await fetch(API_URL+'/kagura/eval', {
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

export async function insertCard(args: KaguraCardDTO): Promise<void> {
  const { requirements, type, category, difficulty } = args;

  const request = await fetch(API_URL+'/kagura/card', {
    method: 'post',
    body: JSON.stringify({ requirements, type, category, difficulty }),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const response = request.json();

  return response;
}

export async function removeCard({card_id}: {card_id: string}): Promise<void> {
  const request = await fetch(API_URL+'/kagura/card', {
    method: 'delete',
    body: JSON.stringify({ card_id }),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const response = request.json();

  return response;
}

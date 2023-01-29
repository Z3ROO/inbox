import { IKagura, KaguraCardDTO, KaguraMetaData } from "../types";

export async function getKagura(): Promise<IKagura[]> {
  const request = await fetch('http://localhost:3001/kagura');
  const response = request.json();

  return response;

  return [
    {
      type: 'Theoretical',
      routines: [
        {
          category: 'ReactJS',
          cards: [
            {
              _id: '1123asdasdasdasd',
              requirements: 'Explique setState.'
            },
            {
              _id: 'a1123asdasdasdasd',
              requirements: 'Explique useEffect.'
            }
          ]
        },
        {
          category: 'Ciencia_da_computação',
          cards: [
            {
              _id: '1123asdasdasdasd',
              requirements: 'Explique threads.'
            },
            {
              _id: 'a1123asdasdasdasd',
              requirements: 'Explique memory leak.'
            }
          ]
        }
      ]
    }
  ]
}

export async function getKaguraMetaData(): Promise<KaguraMetaData> {
  const request = await fetch('http://localhost:3001/kagura/meta');
  const response = request.json();

  return response;
  return {
    types: ['Theoretical'],
    categories: ['Computer_Science', 'ReactJS', 'Data_Structures_and_Algorithms']
  }
}

export async function evaluateCard(args: {card_id: string, note: -1|0|1, started_at: Date, finished_at: Date}): Promise<void> {
  const request = await fetch('http://localhost:3001/kagura/eval', {
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
  return;
}

export async function insertCard(args: KaguraCardDTO): Promise<void> {
  const { requirements, type, category } = args;

  const request = await fetch('http://localhost:3001/kagura/card', {
    method: 'post',
    body: JSON.stringify({ requirements, type, category }),
    headers: {
      'Content-type': 'application/json'
    }
  });
  const response = request.json();

  return;
}
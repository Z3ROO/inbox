import { IKagura } from "../types";

export async function getKagura(): Promise<IKagura[]> {
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
          category: 'Ciencia da computação',
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

export async function evaluateCard(args: {card_id: string, note: -1|0|1}): Promise<void> {
  return ;
}
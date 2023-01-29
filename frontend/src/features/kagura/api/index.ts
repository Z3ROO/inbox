import { IKagura, KaguraCardDTO, KaguraMetaData } from "../types";

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

export async function getKaguraMetaData(): Promise<KaguraMetaData> {
  return {
    types: ['Theoretical'],
    categories: ['Computer_Science', 'ReactJS', 'Data_Structures_and_Algorithms']
  }
}

export async function evaluateCard(args: {card_id: string, note: -1|0|1, started_at: Date, finished_at: Date}): Promise<void> {
  console.log(args)
  return;
}

export async function insertCard(args: KaguraCardDTO): Promise<void> {
  console.log(args);
  return;
}
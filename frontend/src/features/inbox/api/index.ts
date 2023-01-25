import { IInboxItem } from "@/features/inbox/types";
const API_URL = 'http://localhost:3001';

export async function getInboxItems(): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/inbox`);
  const response = await request.json();

  return response;

  // return [
  //   {
  //     content: 'Inbox teste 1',
  //     last_delay: null,
  //     allowed_after: new Date(321321654)
  //   },
  //   {
  //     content: 'Inbox teste 2',
  //     last_delay: {
  //       amount: 'day',
  //       delayed_at: new Date(1231321545)
  //     },
  //     allowed_after: new Date(321321654)
  //   },
  //   {
  //     content: 'Inbox teste 3',
  //     last_delay: null,
  //     allowed_after: new Date(321321654)
  //   },
  //   {
  //     content: 'Inbox teste 4',
  //     last_delay: {
  //       amount: 'day',
  //       delayed_at: new Date(1231321545)
  //     },
  //     allowed_after: new Date(321321654)
  //   },
  //   {
  //     content: 'Inbox teste 5',
  //     last_delay: null,
  //     allowed_after: new Date(321321654)
  //   }
  // ]
}

export async function updateInboxItem(args: {inboxItem_id: string, action: 'day'|'week'|'month'|'3months'|'remove'|'undo'}) {
  const { inboxItem_id, action } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'put',
    body: JSON.stringify({action, item_id: inboxItem_id}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

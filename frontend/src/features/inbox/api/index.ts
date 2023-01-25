import { IInboxItem } from "@/features/inbox/types";

export async function getInboxItems(): Promise<IInboxItem[]> {
  // const request = await fetch('');
  // const response = await request.json();

  //return response;

  return [
    {
      content: 'Inbox teste 1',
      last_delay: null,
      allowed_after: new Date(321321654)
    },
    {
      content: 'Inbox teste 2',
      last_delay: {
        amount: 'day',
        delayed_at: new Date(1231321545)
      },
      allowed_after: new Date(321321654)
    },
    {
      content: 'Inbox teste 3',
      last_delay: null,
      allowed_after: new Date(321321654)
    },
    {
      content: 'Inbox teste 4',
      last_delay: {
        amount: 'day',
        delayed_at: new Date(1231321545)
      },
      allowed_after: new Date(321321654)
    },
    {
      content: 'Inbox teste 5',
      last_delay: null,
      allowed_after: new Date(321321654)
    }
  ]
}

export async function updateInboxItem(args: {action: 'day'|'week'|'month'|'3months'|'remove'|'undo'}) {
  // const request = await fetch('');
  // const response = await request.json();

  // return response;
}

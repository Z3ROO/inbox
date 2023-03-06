import { API_URL } from "@/config/API";
import { IInboxItem } from "@/features/inbox/types";


export async function getInboxItems(): Promise<IInboxItem[]> {
  const request = await fetch(`${API_URL}/inbox`);
  const response = await request.json();

  return response;
}

export async function insertInboxItem(args: {content: string}) {
  const { content } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'post',
    body: JSON.stringify({content}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

export async function updateInboxItem(args: {content?: string, inboxItem_id: string, action: 'day'|'week'|'month'|'3months'|'remove'|'undo'}) {
  const { content, inboxItem_id, action } = args;
  
  const request = await fetch(`${API_URL}/inbox`, {
    method: 'put',
    body: JSON.stringify({content, action, item_id: inboxItem_id}),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const response = await request.json();

  return response;
}

export async function attachToProject(args: { project_id: string, inboxItem_id: string }) {
  const { project_id, inboxItem_id } = args;

  const request = await fetch(`${API_URL}/inbox/attachProject`, {
    method: 'put',
    body: JSON.stringify({project_id, inboxItem_id}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();
}

export async function enqueueInboxItem(args: { inboxItem_id: string, priority: number }) {
  const { inboxItem_id, priority } = args;

  const request = await fetch(`${API_URL}/inbox/enqueue`, {
    method: 'put',
    body: JSON.stringify({ inboxItem_id, priority }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await request.json();
}


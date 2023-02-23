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

export async function getListOfProjects() {
  return [
    {
      value: 'ProjetoUm',
      label: 'idzeroum'
    },
    {
      value: 'ProjetoDois',
      label: 'idzerodois'
    },
    {
      value: 'ProjetoTres',
      label: 'idzerotres'
    },
    {
      value: 'ProjetoQuatro',
      label: 'idzeroquatro'
    },
    {
      value: 'Projeto1Dois',
      label: 'idzero1doisasdasdasdasdasdasdasd'
    },
    {
      value: 'Projeto2Tres',
      label: 'idzero2tres'
    },
    {
      value: 'Projeto3Quatro',
      label: 'idzero4quatro'
    },
    {
      value: 'Projeto5Dois',
      label: 'idzero5dois'
    },
    {
      value: 'Projeto6Tres',
      label: 'idzero6tres'
    },
    {
      value: 'Projeto7Quatro',
      label: 'idzero7quatro'
    }
  ]
}


export async function attachToProject(args: { project_id: string, inboxItem_id: string }) {
}

export async function enqueueInboxItem(args: { inboxItem_id: string, priority: number }) {
}

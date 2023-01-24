export async function getInboxItems() {
  const request = await fetch('');
  const response = await request.json();

  return response;
}

export async function updateInboxItem() {
  const request = await fetch('');
  const response = await request.json();

  return response;
}

export async function removeInboxItem() {
  const request = await fetch('');
  const response = await request.json();

  return response;
}

export async function undoInboxItemUpdate() {
  const request = await fetch('');
  const response = await request.json();

  return response;
}
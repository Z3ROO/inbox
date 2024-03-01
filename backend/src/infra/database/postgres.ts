import { Client } from 'pg';

const client = new Client();

let connected = false;

export async function connectPostgresDB() {
  if (connected)
    return;
  
  try {
    await client.connect();
    connected = true;
  }
  catch(err) {
    throw err;
  }
}

export async function disconnectPostgresDB() {
  await client.end();
}

export const postgres = client;

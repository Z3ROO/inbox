import { Client } from 'pg';

const client = new Client();

export async function connectPostgresDB() {
  await client.connect();
}

export async function disconnectPostgresDB() {
  await client.end();
}

export const postgres = client;

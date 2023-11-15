import { Client } from 'pg';

const client = new Client();

export async function connectPostgresDB() {
  await client.connect();
  console.log("Postgres database connected");
}

export async function disconnectPostgresDB() {
  await client.end();
}

export const postgres = client;
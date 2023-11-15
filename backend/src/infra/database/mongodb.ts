import { MongoClient } from 'mongodb';
const NODE_ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;
const DB_PORT = process.env.DB_PORT;

const status: { database: null| MongoClient } = {
  database: null
}

const client = new MongoClient(`${DB_URL}:${DB_PORT}`);

export async function connectDB() {
  const connection = await client.connect();
  status.database = connection;

  console.log('Database connected');
}

export const mongodb = (dbName: string) => status.database.db(dbName);
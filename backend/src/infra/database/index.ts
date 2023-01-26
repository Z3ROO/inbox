import { MongoClient } from 'mongodb';

const DB_URL = process.env.DB_URL || 'mongodb://localhost:3002';

const status: { database: null| MongoClient } = {
  database: null
}

const client = new MongoClient(DB_URL);

export async function connectDB() {
  const connection = await client.connect();
  console.log('Database connected')
  status.database = connection;
}

export const database = (dbName: string) => status.database.db(dbName);
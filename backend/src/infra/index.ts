import { connectMongoDB, connectPostgresDB } from "./database";
import { connectHTTPServer } from "./http-server";

export async function initInfrastructure() {
  verifyEnviromentalVariables();
  await connectMongoDB();
  await connectPostgresDB();
  connectHTTPServer();
}

function verifyEnviromentalVariables() {
  const { NODE_ENV, SERVER_PORT, DB_URL, DB_PORT } = process.env;

  if (!(NODE_ENV && SERVER_PORT && DB_URL && DB_PORT)) {
    console.error('Enviromental variables incorrectely set');
    process.exit(1);
  }
}
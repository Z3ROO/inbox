import { connectPostgresDB } from "./database";
import { connectHTTPServer } from "./http-server";

export async function initInfrastructure() {
  //THIS VERIFY SEEMS USELESS
  verifyEnviromentalVariables();
  await connectPostgresDB();
  connectHTTPServer();
}

function verifyEnviromentalVariables() {
  const { NODE_ENV, SERVER_PORT, PGUSER, PGPORT, PGHOST, PGPASSWORD, PGDATABASE } = process.env; 
  if (!(NODE_ENV && SERVER_PORT && PGUSER && PGPORT && PGHOST && PGPASSWORD && PGDATABASE)) {
    throw new Error('Enviromental variables incorrectely set');
    
  }
}
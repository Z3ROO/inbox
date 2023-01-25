import { connectDB } from "./database";
import { connectHTTPServer } from "./http-server";

export async function initInfrastructure() {
  await connectDB();
  connectHTTPServer();
}
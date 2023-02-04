import { app } from "./config/server-config";

const SERVER_PORT = process.env.SERVER_PORT;

export const connectHTTPServer = () => app.listen(SERVER_PORT, () => {
  console.log(`Server connected on port ${SERVER_PORT}`);
});

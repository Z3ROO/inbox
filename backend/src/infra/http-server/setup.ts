import { defaultErrorHandler } from './ErrorHandler';
import express from 'express';

const SERVER_PORT = process.env.SERVER_PORT;

export const app = express();

import './middlewares';
import './routes';

app.use(defaultErrorHandler)

export const connectHTTPServer = () => app.listen(SERVER_PORT, () => {
  console.log(`Server connected on port ${SERVER_PORT}`);
});

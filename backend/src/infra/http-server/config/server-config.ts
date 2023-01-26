import express from 'express';
import cors from 'cors';
import {router} from '@/controllers/inbox-controller';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

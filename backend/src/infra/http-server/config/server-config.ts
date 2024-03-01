import express from 'express';
import cors from 'cors';
import inboxRouter from '@/controllers/inbox-controller';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/inbox', inboxRouter);

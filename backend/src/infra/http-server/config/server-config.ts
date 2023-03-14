import express from 'express';
import cors from 'cors';
import { router as inboxRouter } from '@/controllers/inbox-controller';
import { router as kaguraRouter } from '@/controllers/kagura-controller';
import { router as projectsRouter } from '@/controllers/projects-controller';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(inboxRouter);
app.use('/rehearsal', kaguraRouter);
app.use('/projects', projectsRouter);


import { app } from './setup';
import inboxRouter from '@/core/features/Inbox/controller';
import toDealRouter from '@/core/features/ToDeal/controller';
import draftsRouter from '@/core/entities/Drafts/controller';
import subjectsRouter from '@/core/entities/Subjects/controller';
import tasksRouter from '@/core/entities/Tasks/controller';

app.use('/inbox', inboxRouter);
app.use('/to_deal', toDealRouter);
app.use('/drafts', draftsRouter);
app.use('/tasks', tasksRouter);
app.use('/subjects', subjectsRouter);
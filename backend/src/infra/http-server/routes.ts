import { app } from './setup';
import inboxRouter from '@/core/features/Inbox/controller';
import toDealRouter from '@/core/features/ToDeal/controller';
import draftsRouter from '@/core/entities/Drafts/controller';
import draftCategoriesRouter from '@/core/entities/DraftCategories/controller';

app.use('/inbox', inboxRouter);
app.use('/to_deal', toDealRouter);
app.use('/drafts', draftsRouter);
app.use('/draft_categories', draftCategoriesRouter);
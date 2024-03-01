#!/usr/bin/env ts-node

import {config} from 'dotenv'
config({path: '../../../../.env.dev'});
import {v4 as uuid } from 'uuid';
import { connectMongoDB, connectPostgresDB, postgres } from "@/infra/database";
import { InboxRepository, InboxRepositorySQL, DraftCategoryRepo, DraftCategoryRepoSQL } from "@/repository/inbox-repository";


console.log('qweqweqweqweqwe: ', process.env.PGPASSWORD)

async function connectDBs() {
  await connectMongoDB();
  await connectPostgresDB();
}

async function migrate() {
  await connectDBs();
  const inboxMongo = new InboxRepository();
  const inboxPG = new InboxRepositorySQL();
  const categoriesRepo = new DraftCategoryRepo();
  const categoriesRepoSQL = new DraftCategoryRepoSQL();

  const categories = await categoriesRepo.findAll();
  const drafts = await inboxMongo.findEverything();


  for await(const category of categories) {
    await categoriesRepoSQL.create({
      _id: uuid(),
      name: category.name
    });
  }

  for await(const draft of drafts) {
    const category_id = (await categoriesRepoSQL.findByName(draft.category.name)).data[0]._id;

    inboxPG.insertDraft({
      _id: uuid(),
      content: draft.content,
      priority: draft.priority,
      category_id,
      created_at: draft.created_at,
      delay: draft.last_delay?.amount,
      delayed_at: draft.last_delay?.delayed_at,
      delay_quantity: draft.last_delay?.quantity,
      allowed_after: draft.allowed_after,
      todo: draft.todo
    })
  }

  console.log('tey')
}

async function ViewData() {
  await connectDBs();

  
  const inboxPG = new InboxRepositorySQL();
  const res = await inboxPG.findAllowedTasks();

  // const res = await postgres.query(`
  //   SELECT Drafts._id, content, priority, created_at, delay, delayed_at, delay_quantity, allowed_after, todo,
  //     jsonb_build_object('_id', DraftCategories._id, 'name', DraftCategories.name, 'color', DraftCategories.color, 'icon', DraftCategories.icon) AS category 
  //   FROM Drafts 
  //   LEFT JOIN DraftCategories ON Drafts.category = DraftCategories._id;
  // `)
  console.log(res);
  console.log(res.data);
}

migrate();
//ViewData();

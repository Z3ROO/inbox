import { connectMongoDB, connectPostgresDB, postgres } from "@/infra/database";
import { InboxRepository, InboxRepositorySQL, DraftCategoryRepo, DraftCategoryRepoSQL } from "@/repository/inbox-repository";


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

  drafts.forEach(draft => {
    inboxPG.insertDraft({
      _id: draft._id.toString(),
      content: draft.content,
      priority: draft.priority,
      category_id: draft.category.toString(),
      created_at: draft.created_at,
      delay: draft.last_delay?.amount,
      delayed_at: draft.last_delay?.delayed_at,
      delay_quantity: draft.last_delay?.quantity,
      allowed_after: draft.allowed_after,
      todo: draft.todo
    })
  })

  categories.forEach((category) => {
    categoriesRepoSQL.create({_id: category._id.toString(), name: category.name});
  })

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

ViewData();
const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("groupTransactions.index", "/", async ctx => {
  let { page, pageSize } = ctx.query;
  page = page || 0;
  pageSize = pageSize || 20;
  const offset = page * pageSize;
  const limit = pageSize;
  const transactions = await ctx.orm.groupTransaction.findAndCountAll({
    offset,
    limit,
    order: [["id", "DESC"]],
    where: { groupId: ctx.params.group_id }
  });
  const totalPages = Math.ceil(transactions.count / pageSize);
  ctx.body = { transactions: transactions.rows, totalPages };
});

router.post("groupTransactions.create", "/", async ctx => {
  const { amount, income, category, date } = ctx.request.body;
  const newTransaction = ctx.orm.groupTransaction.build({
    amount,
    income,
    category,
    date,
    groupId: ctx.params.group_id
  });
  try {
    await newTransaction.save({
      fields: ["amount", "income", "category", "groupId", "date"]
    });
    let { page, pageSize } = ctx.query;
    page = page || 0;
    pageSize = pageSize || 20;
    const offset = page * pageSize;
    const limit = pageSize;
    const transactions = await ctx.orm.groupTransaction.findAndCountAll({
      offset,
      limit,
      order: [["id", "DESC"]],
      where: { groupId: ctx.params.group_id }
    });
    const totalPages = Math.ceil(transactions.count / pageSize);
    ctx.body = { transactions: transactions.rows, totalPages };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error };
  }
});

router.delete("groupTransactions.delete", "/:id", async ctx => {
  try {
    const transaction = await ctx.orm.groupTransaction.findByPk(ctx.params.id);
    await transaction.destroy();
    ctx.body = { message: "transaction deleted" };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error };
  }
});

module.exports = router;

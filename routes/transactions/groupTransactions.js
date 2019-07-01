const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("groupTransactions.index", "/", async ctx => {
  const transactions = await ctx.orm.groupTransaction.findAll({
    where: { groupId: ctx.params.group_id }
  });
  ctx.body = transactions;
});

router.post("groupTransactions.create", "/", async ctx => {
  const { amount, income, category } = ctx.request.body;
  const newTransaction = ctx.orm.groupTransaction.build({
    amount,
    income,
    category,
    groupId: ctx.params.group_id
  });
  try {
    await newTransaction.save({
      fields: ["amount", "income", "category", "groupId"]
    });
    const transactions = await ctx.orm.groupTransaction.findAll({
      where: { groupId: ctx.params.group_id }
    });
    ctx.body = transactions;
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

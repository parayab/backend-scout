const KoaRouter = require("koa-router");
const Sequelize = require("sequelize");

const { Op } = Sequelize;

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
    order: [["date", "DESC"]],
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
      order: [["date", "DESC"]],
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

router.get("groupTransactions.dashboard", "/dashboard_detail", async ctx => {
  const { initialDate } = ctx.query;
  try {
    const transactions = await ctx.orm.groupTransaction.findAll({
      where: {
        groupId: ctx.params.group_id,
        date: { [Op.gte]: initialDate }
      },
      attributes: [
        "income",
        [Sequelize.fn("COUNT", Sequelize.col("income")), "n_incomes"],
        [Sequelize.fn("sum", Sequelize.col("amount")), "sum_incomes"],
        [
          Sequelize.fn("date_trunc", "month", Sequelize.col("date")),
          "income_date"
        ]
      ],
      group: ["income_date", "income"]
    });
    ctx.body = { transactions };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error };
  }
});

router.get(
  "groupTransactions.dashboard",
  "/dashboard_aggregated",
  async ctx => {
    try {
      const transactions = await ctx.orm.groupTransaction.findAll({
        where: {
          groupId: ctx.params.group_id
        },
        attributes: [
          "income",
          [Sequelize.fn("sum", Sequelize.col("amount")), "sum_incomes"]
        ],
        group: "income"
      });
      ctx.body = { transactions };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { error };
    }
  }
);

module.exports = router;

const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("users", "/", async ctx => {
  const users = await ctx.orm.user.findAll();
  ctx.body = { users };
});

module.exports = router;

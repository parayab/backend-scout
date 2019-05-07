const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("books", "/", async ctx => {
  const books = await ctx.orm.book.findAll();
  ctx.body = { books };
});

module.exports = router;

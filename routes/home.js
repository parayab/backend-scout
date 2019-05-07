const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("/", async ctx => {
  ctx.body = {
    msg: "Hello World",
    books_link: ctx.request.header.host + ctx.router.url("books")
  };
});

module.exports = router;

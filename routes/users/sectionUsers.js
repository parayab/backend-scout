const KoaRouter = require("koa-router");
const userFunctions = require("./userFunctions");

const router = new KoaRouter();

router.get("section.users.index", "/", async ctx => {
  const sectionId = ctx.params.section_id;
  const users = await ctx.orm.user.findAll({ where: { sectionId } });
  ctx.body = { users };
});

router.post("secion.users.create", "/", async ctx => {
  const sectionId = ctx.params.section_id;
  const groupId = ctx.params.group_id;

  const newUser = await userFunctions.create(ctx, {
    ...ctx.request.body,
    groupId,
    sectionId
  });
  if (newUser instanceof Error) {
    ctx.body = newUser.errors;
    return;
  }
  const sectionUsers = await ctx.orm.user.findAll({ where: { sectionId } });
  ctx.body = { sectionUsers };
});
module.exports = router;

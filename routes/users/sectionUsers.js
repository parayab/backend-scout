const KoaRouter = require("koa-router");
const userFunctions = require("./userFunctions");

const router = new KoaRouter();

router.get("section.users.index", "/", async ctx => {
  const sectionId = ctx.params.section_id;
  const users = await ctx.orm.user.findAll({ where: { sectionId } });
  ctx.body = { users };
});

router.post("section.users.create", "/", async ctx => {
  const sectionId = ctx.params.section_id;
  const groupId = ctx.params.group_id;
  const newUser = await userFunctions.create(ctx, {
    ...ctx.request.body,
    groupId,
    sectionId,
    password: ctx.request.body.email.slice(0, 6)
  });
  if (newUser instanceof Error) {
    ctx.body = newUser.errors;
    return;
  }
  const sectionUsers = await ctx.orm.user.findAll({ where: { sectionId } });
  ctx.body = { sectionUsers };
});

router.patch("section.users.patch", "/:user_id", async ctx => {
  const editUser = await userFunctions.patch(ctx, ctx.request.body);
  if (editUser instanceof Error) {
    ctx.body = editUser.errors;
    return;
  }
  const sectionUsers = await ctx.orm.user.findAll({
    where: { sectionId: ctx.params.section_id }
  });
  ctx.body = { sectionUsers };
});

router.delete("sections.user.delete", "/:user_id", async ctx => {
  try {
    const deleteUser = await ctx.orm.user.findOne({
      where: { id: ctx.params.user_id }
    });
    await deleteUser.destroy();
    const sectionUsers = await ctx.orm.user.findAll({
      where: { sectionId: ctx.params.section_id }
    });
    ctx.body = { sectionUsers };
  } catch (error) {
    ctx.body = { error: error.errors };
  }
});
module.exports = router;

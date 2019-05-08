const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("sections.index", "/", async ctx => {
  const groupId = ctx.params.group_id;
  const sections = await ctx.orm.section.findAll({ where: { groupId } });
  ctx.body = { sections };
});

router.get("sections.show", "/:section_id", async ctx => {
  const section = await ctx.orm.section.findAll({
    where: {
      id: ctx.params.section_id,
      groupId: ctx.params.group_id
    }
  });
  ctx.body = { section };
});

router.post("sections.create", "/", async ctx => {
  const newSection = ctx.orm.section.build(ctx.request.body);
  newSection.groupId = ctx.params.group_id;
  try {
    await newSection.save({ fields: ["name", "typeId", "groupId"] });
    const sections = await ctx.orm.section.findAll();
    ctx.body = { sections };
  } catch (validationError) {
    ctx.body = { errors: validationError.errors };
  }
});

router.patch("sections.update", "/:section_id", async ctx => {
  try {
    const section = await ctx.orm.section.findOne({
      where: {
        id: ctx.params.section_id,
        groupId: ctx.params.group_id
      }
    });
    Object.keys(ctx.request.body).forEach(field => {
      section[field] = ctx.request.body[field];
    });
    await section.save();
    ctx.body = { section };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

router.delete("sections.delete", "/:section_id", async ctx => {
  try {
    const section = await ctx.orm.section.findOne({
      where: {
        id: ctx.params.section_id,
        groupId: ctx.params.group_id
      }
    });
    await section.destroy();
    ctx.body = { message: "section deleted" };
  } catch (error) {
    ctx.body = { message: error.message };
  }
});

module.exports = router;

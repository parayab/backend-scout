const KoaRouter = require("koa-router");
const sectionFunctions = require("./sectionFunctions");

const router = new KoaRouter();
const users = require("../users/sectionUsers");

router.use("/:section_id/users", users.routes());

router.get("sections.index", "/", async ctx => {
  const groupId = ctx.params.group_id;
  const sections = await ctx.orm.section.findAll({
    where: { groupId },
    offset: 1
  });
  ctx.body = { sections };
});

router.get("section.types", "/sectionTypes", async ctx => {
  const sectionTypes = await ctx.orm.sectionType.findAll({
    offset: 1
  });
  ctx.body = { sectionTypes };
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
  const { name, typeId } = ctx.request.body;
  const newSection = await sectionFunctions.create(ctx, {
    name,
    typeId,
    groupId: ctx.params.group_id
  });
  ctx.body = newSection;
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

    const sections = await ctx.orm.section.findAll({
      where: { groupId: ctx.params.group_id },
      offset: 1
    });
    ctx.body = { sections };
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

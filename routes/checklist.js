const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.post("checklist.create", "/createchecklist", async ctx => {
  const { groupEventId } = ctx.params;
  const { name } = ctx.request.body;

  const newChecklist = ctx.orm.checklist.build({
    name,
    groupEventId
  });

  try {
    await newChecklist.save({
      fields: ["name", "groupEventId"]
    });
    const checklists = await ctx.orm.checklist.findAll({
      where: {
        groupEventId
      }
    });
    ctx.body = { checklists };
  } catch (validationError) {
    ctx.body = { errors: validationError };
  }
});

router.delete(
  "checklist.delete",
  "/deletechecklist/:checklistId",
  async ctx => {
    try {
      const { checklistId, groupEventId } = ctx.params;
      const checklist = await ctx.orm.checklist.findOne({
        where: {
          id: checklistId
        }
      });
      await checklist.destroy();
      const checklists = await ctx.orm.checklist.findAll({
        where: {
          groupEventId
        }
      });
      ctx.body = { checklists };
    } catch (validationError) {
      ctx.body = { errors: validationError };
    }
  }
);

module.exports = router;

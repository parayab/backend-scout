const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.get("checklist.index", "/checklist", async ctx => {
  const { groupEventId } = ctx.params;
  const checklist = await ctx.orm.checklist.findAll({
    where: {
      groupEventId
    }
  });
  ctx.body = { checklist };
});

router.post("checklist.create", "/checklist", async ctx => {
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

router.delete("checklist.delete", "/checklist/:checklistId", async ctx => {
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
});

router.patch(
  "checklist.toggleCompleted",
  "/checklist/:checklistId/toggle",
  async ctx => {
    try {
      const { checklistId, groupEventId } = ctx.params;
      const checklist = await ctx.orm.checklist.findOne({
        where: {
          id: checklistId
        }
      });
      checklist.completed = !checklist.completed;
      await checklist.save();
      const checklists = await ctx.orm.checklist.findAll({
        where: {
          groupEventId
        }
      });
      ctx.body = { checklists };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { error };
    }
  }
);

router.patch(
  "checklist.toggleCompleted",
  "/checklist/:checklistId",
  async ctx => {
    try {
      const { checklistId, groupEventId } = ctx.params;
      const checklist = await ctx.orm.checklist.findOne({
        where: {
          id: checklistId
        }
      });
      checklist.name = ctx.request.body.name;
      await checklist.save();
      const checklists = await ctx.orm.checklist.findAll({
        where: {
          groupEventId
        }
      });
      ctx.body = { checklists };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { error };
    }
  }
);

module.exports = router;

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
  } catch (validationError) {
    ctx.body = { errors: validationError };
    return;
  }
  ctx.body = { newChecklist };
});

module.exports = router;

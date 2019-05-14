const KoaRouter = require("koa-router");

const router = new KoaRouter();

// const sectionFunctions = require("./sectionFunctions");
// const sections = require("./section");

router.get("sectionEvent.index", "/", async ctx => {
  const sectionId = ctx.params.section_id;
  const sectionEvents = await ctx.orm.sectionEvent.findAll({
    where: { sectionId }
  });
  ctx.body = { sectionEvents };
});

router.get("sectionEvent.show", "/:sectionEvent_id", async ctx => {
  const sectionEvent = await ctx.orm.sectionEvent.findAll({
    where: {
      id: ctx.params.sectionEvent_id,
      sectionId: ctx.params.section_id
    }
  });
  ctx.body = { sectionEvent };
});

router.post("sectionEvent.create", "/", async ctx => {
  const sectionId = ctx.params.section_id;
  const {
    name,
    foundationDate,
    location,
    description,
    price
  } = ctx.request.body;

  const newSectionEvent = ctx.orm.sectionEvent.build({
    sectionId,
    name,
    foundationDate,
    location,
    description,
    price
  });

  try {
    await newSectionEvent.save({
      fields: [
        "sectionId",
        "name",
        "foundationDate",
        "location",
        "description",
        "price"
      ]
    });
  } catch (validationError) {
    ctx.body = { errors: validationError };
    return;
  }
  ctx.body = { newSectionEvent };
});

router.patch("sectionEvent.update", "/:sectionEvent_id", async ctx => {
  try {
    const sectionEvent = await ctx.orm.sectionEvent.findOne({
      where: {
        id: ctx.params.sectionEvent_id,
        sectionId: ctx.params.section_id
      }
    });
    Object.keys(ctx.request.body).forEach(field => {
      sectionEvent[field] = ctx.request.body[field];
    });
    await sectionEvent.save();
    ctx.body = { sectionEvent };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

router.delete("sectionEvent.delete", "/:sectionEvent_id", async ctx => {
  try {
    const sectionEvent = await ctx.orm.sectionEvent.findOne({
      where: {
        id: ctx.params.sectionEvent_id,
        sectionId: ctx.params.section_id
      }
    });
    await sectionEvent.destroy();
    ctx.body = { message: "section deleted" };
  } catch (error) {
    ctx.body = { message: error.message };
  }
});

module.exports = router;

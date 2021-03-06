const KoaRouter = require("koa-router");
const sectionFunctions = require("./sections/sectionFunctions");

const router = new KoaRouter();
const sections = require("./sections/section");
const groupEvent = require("./groupEvent");
const groupTransaction = require("./transactions/groupTransactions");

router.use("/:group_id/sections", sections.routes());
router.use("/:group_id/groupevent", groupEvent.routes());
router.use("/:group_id/groupTransaction", groupTransaction.routes());

router.post("groups.create", "/", async ctx => {
  const newGroup = ctx.orm.group.build(ctx.request.body);
  // TODO: create default section
  try {
    await newGroup.save({ fields: ["name", "foundationDate"] });
    const {
      dataValues: defaultSectionType
    } = await ctx.orm.sectionType.findOne({
      where: { name: "Sin Unidad" }
    });
    await sectionFunctions.create(ctx, {
      name: "Sin Unidad",
      typeId: defaultSectionType.id,
      groupId: newGroup.id
    });
    const groups = await ctx.orm.group.findAll();
    ctx.body = { groups };
  } catch (validationError) {
    ctx.body = { errors: validationError.errors };
  }
});

router.get("groups.index", "/", async ctx => {
  const groups = await ctx.orm.group.findAll();
  ctx.body = { groups };
});

router.get("groups.show", "/:group_id", async ctx => {
  const group = await ctx.orm.group.findByPk(ctx.params.group_id);
  ctx.body = { group };
});

router.patch("group.update", "/:group_id", async ctx => {
  try {
    const group = await ctx.orm.group.findByPk(ctx.params.group_id);
    Object.keys(ctx.request.body).forEach(field => {
      group[field] = ctx.request.body[field];
    });
    await group.save();
    ctx.body = { group };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

router.delete("groups.delete", "/:group_id", async ctx => {
  try {
    const group = await ctx.orm.group.findByPk(ctx.params.group_id);
    await group.destroy();
    ctx.body = { message: "group deleted" };
  } catch (error) {
    ctx.body = { message: error.message };
  }
});

router.get("group.users.index", "/:group_id/users", async ctx => {
  const users = await ctx.orm.user.findAll({
    include: [
      {
        attributes: ["name"],
        model: ctx.orm.section,
        required: true,
        include: [
          {
            attributes: [],
            model: ctx.orm.group,
            as: "group",
            required: true
          }
        ]
      }
    ]
  });
  ctx.body = { users };
});

module.exports = router;

const KoaRouter = require("koa-router");

const router = new KoaRouter();

// const sectionFunctions = require("./sectionFunctions");
// const sections = require("./section");

router.get("groupEvent.index", "/", async ctx => {
  const groupId = ctx.params.group_id;
  const groupEvents = await ctx.orm.groupEvent.findAll({ where: { groupId } });
  ctx.body = { groupEvents };
});

router.get("groupEvent.show", "/:groupEvent_id", async ctx => {
  const groupEvent = await ctx.orm.groupEvent.findAll({
    where: {
      id: ctx.params.groupEvent_id,
      groupId: ctx.params.group_id
    }
  });
  ctx.body = { groupEvent };
});

router.get(
  "groupEvent.addUser",
  "/:groupEvent_id/addUser/:userId",
  async ctx => {
    const { group_id, userId, groupEvent_id } = ctx.params;
    const user = await ctx.orm.user.findOne({
      where: {
        id: userId
      }
    });
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: groupEvent_id
      }
    });
    const section = await user.getSection();
    const the_users_group = await section.getGroup();
    // if the_users_group != group_id => error!
    // else continue
    ctx.body = { theusersgroup: the_users_group.id, group_id };
  }
);

router.post("groupEvent.create", "/", async ctx => {
  const groupId = ctx.params.group_id;
  const {
    name,
    foundationDate,
    location,
    description,
    price
  } = ctx.request.body;

  const newGroupEvent = ctx.orm.groupEvent.build({
    groupId,
    name,
    foundationDate,
    location,
    description,
    price
  });

  try {
    await newGroupEvent.save({
      fields: [
        "groupId",
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
  ctx.body = { newGroupEvent };
});

router.patch("groupEvent.update", "/:groupEvent_id", async ctx => {
  try {
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: ctx.params.groupEvent_id,
        groupId: ctx.params.group_id
      }
    });
    Object.keys(ctx.request.body).forEach(field => {
      groupEvent[field] = ctx.request.body[field];
    });
    await groupEvent.save();
    ctx.body = { groupEvent };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

router.delete("groupEvent.delete", "/:groupEvent_id", async ctx => {
  try {
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: ctx.params.groupEvent_id,
        groupId: ctx.params.group_id
      }
    });
    await groupEvent.destroy();
    ctx.body = { message: "section deleted" };
  } catch (error) {
    ctx.body = { message: error.message };
  }
});

module.exports = router;

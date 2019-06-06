const KoaRouter = require("koa-router");

const router = new KoaRouter();

const userGroupEvent = require("./users/userGroupEvent");

router.use("/:groupEventId/", userGroupEvent.routes());

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
  const groupEvents = await ctx.orm.groupEvent.findAll({
    where: {
      groupId
    }
  });
  ctx.body = { groupEvents };
});

router.patch("groupEvent.update", "/:groupEvent_id", async ctx => {
  try {
    const groupId = ctx.params.group_id;
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: ctx.params.groupEvent_id,
        groupId
      }
    });
    Object.keys(ctx.request.body).forEach(field => {
      groupEvent[field] = ctx.request.body[field];
    });
    await groupEvent.save();

    const groupEvents = await ctx.orm.groupEvent.findAll({
      where: {
        groupId
      }
    });
    ctx.body = { groupEvents };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

router.delete("groupEvent.delete", "/:groupEventId", async ctx => {
  try {
    const groupId = ctx.params.group_id;
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: ctx.params.groupEventId,
        groupId
      }
    });
    await groupEvent.destroy();

    const groupEvents = await ctx.orm.groupEvent.findAll({
      where: {
        groupId
      }
    });
    ctx.body = { groupEvents };
  } catch (error) {
    ctx.body = { message: error.message };
  }
});

router.get("groupEvent.getusers", "/:groupEventId/getusers", async ctx => {
  const groupId = ctx.params.group_id;
  const groupEvent = await ctx.orm.groupEvent.findOne({
    where: {
      id: ctx.params.groupEventId,
      groupId
    }
  });
  const participants = await groupEvent.getParticipant();
  let users = {};
  participants.forEach(participant => {
    participant.getUser().then(user => {
      users = { ...users, user };
    });
  });
  ctx.body = users;
});

module.exports = router;

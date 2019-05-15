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

router.get("groupEvent.participants", "/:groupEvent_id", async ctx => {
  const groupEvent = await ctx.orm.groupEvent.findAll({
    where: {
      id: ctx.params.groupEvent_id,
      groupId: ctx.params.group_id
    }
  });

  ctx.body = { groupEvent };
});

router.post(
  "groupEvent.addUser",
  "/:groupEventId/addUser/:userId",
  async ctx => {
    const { userId, groupEventId } = ctx.params;
    const { scholarship } = ctx.request.body;
    const user = await ctx.orm.user.findOne({
      where: {
        id: userId
      }
    });
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: groupEventId
      }
    });
    /*
    const section = await user.getSection();
    const theUsersGroup = await section.getGroup();
    */
    // Add user to groupEvent
    const newUserJoinGroupEvent = ctx.orm.userJoinGroupEvent.build({
      userId,
      groupEventId,
      scholarship
    });

    try {
      await newUserJoinGroupEvent.save({
        fields: ["userId", "groupEventId", "scholarship"]
      });
    } catch (validationError) {
      ctx.body = { errors: validationError };
      return;
    }

    ctx.body = {
      scholarship,
      groupEventId,
      userId
    };
    /*
    if (theUsersGroup == Number(group_id)) {
      ctx.body = { theusersgroup: theUsersGroup.id, group_id };
    } else {}
    }
    */
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

router.delete("groupEvent.delete", "/:groupEvent_id", async ctx => {
  try {
    const groupId = ctx.params.group_id;
    const groupEvent = await ctx.orm.groupEvent.findOne({
      where: {
        id: ctx.params.groupEvent_id,
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

module.exports = router;

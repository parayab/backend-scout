const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.post("usergroupevent.adduser", "/addUser/:userId", async ctx => {
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
});

router.patch("usergroupevent.updateUser", "/editUser/:userId", async ctx => {
  try {
    const { userId, groupEventId } = ctx.params;
    const { scholarship } = ctx.request.body;
    const userJoinGroupEvent = await ctx.orm.userJoinGroupEvent.findOne({
      where: {
        userId,
        groupEventId
      }
    });
    userJoinGroupEvent.scholarship = scholarship;
    await userJoinGroupEvent.save();
    ctx.body = { userJoinGroupEvent };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

router.delete("usergroupevent.deleteUser", "/deleteUser/:userId", async ctx => {
  try {
    const { userId, groupEventId } = ctx.params;
    const userJoinGroupEvent = await ctx.orm.userJoinGroupEvent.findOne({
      where: {
        userId,
        groupEventId
      }
    });
    await userJoinGroupEvent.destroy();
    const userJoinGroupEvents = await ctx.orm.userJoinGroupEvent.findAll();
    ctx.body = { userJoinGroupEvents };
  } catch (error) {
    ctx.body = { errors: error.message };
  }
});

module.exports = router;

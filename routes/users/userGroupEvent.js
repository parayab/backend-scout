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

module.exports = router;

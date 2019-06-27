const KoaRouter = require("koa-router");
const jwt = require("jsonwebtoken");

const router = new KoaRouter();

router.put("session.create", "/login", async ctx => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({
    where: {
      email
    }
  });
  const isPasswordCorrect = user && (await user.checkPassword(password));
  if (isPasswordCorrect) {
    // generate jsonwebtoken
    const token = jwt.sign({ email: user.email }, "this is super secure x", {
      expiresIn: 129600
    }); // Signing the token
    ctx.body = { user, token, login: true };
    return;
  }
  ctx.body = { message: "error al autoidentificarse", login: false };
});

module.exports = router;

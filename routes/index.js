const Router = require("koa-router");
const home = require("./home");
const book = require("./book");
const group = require("./group");
// const section = require("./section");
// const user = require("./users/sectionUsers");
const session = require("./session");

const router = new Router({
  prefix: "/users"
});

router.use("/", home.routes());
router.use("/books", book.routes());
router.use("/groups", group.routes());
router.use("/session", session.routes());
// router.use("/sections", section.routes());
// router.use("/users", user.routes());

module.exports = router;

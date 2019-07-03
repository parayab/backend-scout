const Router = require("koa-router");
const home = require("./home");
const book = require("./book");
const group = require("./group");
// const section = require("./section");
// const user = require("./users/sectionUsers");
const session = require("./session");

const router = new Router();

router.use("/api", home.routes());
router.use("/api/books", book.routes());
router.use("/api/groups", group.routes());
router.use("/api/session", session.routes());
// router.use("/sections", section.routes());
// router.use("/users", user.routes());

module.exports = router;

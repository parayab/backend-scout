const Router = require("koa-router");
const home = require("./home");
const book = require("./book");

const router = new Router();

router.use("/", home.routes());
router.use("/books", book.routes());

module.exports = router;

const Koa = require("koa");
const helmet = require("koa-helmet");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const routes = require("./routes/index");
const orm = require("./models");

const app = new Koa();

app.keys = [
  "these secret keys are used to sign HTTP cookies",
  "to make sure only this app can generate a valid one",
  "and thus preventing someone just writing a cookie",
  "saying he is logged in when it's really not"
];

// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// basic security middleware
app.use(helmet());

// HTTP request body parser
app.use(koaBody());

// HTTP request logger
app.use(logger());

// routing
app.use(routes.routes());

module.exports = app;

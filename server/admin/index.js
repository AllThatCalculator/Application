// libraries
const express = require("express");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const session = require("express-session");

const { models } = require("../models");
const { calculetTempResource } = require("./resources/calculetInfoTemp");
const { userInfoResource } = require("./resources/userInfo");

// middleware
const { auth } = require("../middleware/auth");
const { logger } = require("../middleware/logger");
const { accessController } = require("./utils/accessController");
const { errorHandler } = require("../middleware/errorHandler");

// admin apis
const { getShowCode } = require("./apis/getShowCode");

const MAX_AGE = 60 * 60 * 1000; // 1 hour

const authenticate = auth.login;

// define app
const adminApp = express();
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const adminOptions = {
  resources: [
    {
      resource: models.calculetInfo,
      ...accessController(),
    },
    {
      resource: models.category,
      ...accessController(),
    },
    {
      resource: models.categoryMain,
      ...accessController(),
    },
    {
      resource: models.categorySub,
      ...accessController(),
    },
    {
      resource: models.calculetRecord,
      ...accessController(9, 3, 9, 9),
    },
    {
      resource: models.calculetUpdateLog,
      ...accessController(9, 3, 9, 9),
    },
    {
      resource: models.userCalculetBookmark,
      ...accessController(9, 3, 9, 9),
    },
    {
      resource: models.userCalculetLike,
      ...accessController(9, 3, 9, 9),
    },
    calculetTempResource,
    userInfoResource,
  ],
};

const admin = new AdminJS(adminOptions);
// admin.watch();

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: process.env.COOKIE_NAME,
    cookiePassword: process.env.SESSION_SECRET,
    maxAge: MAX_AGE,
    domain: process.env.SWAGGER_SERVER,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: true,
    },
    name: process.env.COOKIE_NAME,
    maxAge: MAX_AGE,
    domain: process.env.SWAGGER_SERVER,
  }
);

// to use session cookie
adminApp.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: process.env.COOKIE_NAME,
    maxAge: MAX_AGE,
  })
);

adminApp.use(logger);
adminApp.use("/admin/api", auth.admin);
adminApp.use(admin.options.rootPath, adminRouter);

// admin에서 계산기 소스코드 보여주는 API
adminApp.get(
  "/admin/api/show-code/:calculetId",
  errorHandler.dbWrapper(getShowCode)
);

module.exports = adminApp;

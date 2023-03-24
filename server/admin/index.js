// libraries
const express = require("express");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const session = require('express-session');

const { models } = require('../models');
const { calculetTempResource } = require('./calculetInfoTemp');
const { auth } = require("../middleware/auth");
const { logger } = require("../middleware/logger");

const MAX_AGE = 60 * 60 * 1000; // 1 hour


const authenticate = async (email, password) => {

  return Promise.resolve({
    email: email,
    idToken: "ewrwe"
  });
  // return null;
};

// define app
const adminApp = express();
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});
const adminOptions = {
  resources: [
    models.calculetCount,
    models.calculetInfo,
    calculetTempResource,
    models.calculetRecord,
    models.calculetStatistics,
    models.calculetUpdateLog,
    models.category,
    models.categoryMain,
    models.categorySub,
    models.userCalculetBookmark,
    models.userCalculetLike,
    models.userInfo
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
    domain: process.env.SWAGGER_SERVER
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: true
    },
    name: process.env.COOKIE_NAME,
    maxAge: MAX_AGE,
    domain: process.env.SWAGGER_SERVER
  }
);

adminApp.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: process.env.COOKIE_NAME,
  maxAge: MAX_AGE
}));

adminApp.use(logger);

adminApp.use("/admin/api", auth.admin);

// const adminRouter = AdminJSExpress.buildRouter(admin);
adminApp.use(admin.options.rootPath, adminRouter);

module.exports = adminApp;
// libraries
const express = require("express");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');

const { models } = require('../models');
const { calculetTempResource } = require('./calculetInfoTemp');

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
const adminRouter = AdminJSExpress.buildRouter(admin);
adminApp.use(admin.options.rootPath, adminRouter);

module.exports = adminApp;
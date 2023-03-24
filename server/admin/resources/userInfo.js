const { admin } = require("../../config/firebase");
const { models } = require("../../models");
const { accessController } = require("../utils/accessController");

const grantAdminAccessAction = (grantLevel, managerLevel) => ({
  isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= managerLevel),
  actionType: "record",
  component: false,
  handler: (request, response, context) => {
    const { record, currentAdmin } = context;
    admin.auth().setCustomUserClaims(record.params.id, {
      registered: true,
      admin: true,
      accessLevel: grantLevel
    });
    return {
      record: record.toJSON(currentAdmin),
      msg: "Register completed",
    };
  },
  guard: "등록하시겠습니까?",
  icon: "Edit",
  parent: "Grant Admin"
});

const userInfoResource = {
  resource: models.userInfo,
  ...accessController(3, 2, 3, 9),
};

userInfoResource.options.actions = {
  asViewer: grantAdminAccessAction(1, 4),
  asPublisher: grantAdminAccessAction(2, 4),
  asManager: grantAdminAccessAction(3, 4),
  asExecutive: grantAdminAccessAction(4, 9),
};
module.exports = { userInfoResource };
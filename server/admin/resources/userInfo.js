const { admin } = require("../../config/firebase");
const { models, sequelize } = require("../../models");
const { accessController } = require("../utils/accessController");

/**
 * get accesslevel of user from firebase
 * @param {string} userId firebase uid
 * @returns accessLevel of user
 */
async function verifyAccessLevel(userId) {
  return admin
    .auth()
    .getUser(userId)
    .then((user) => {
      console.log(user);
      if (user.customClaims.admin) {
        return user.customClaims.accessLevel;
      }
      return 0;
    })
    .catch((error) => {
      console.error(error);
      return 0;
    });
}

/**
 * grantLevel 부여하는 액션, 최소 managerLevel 이상 가능
 * @param {number} grantLevel 부여할 레벨
 * @param {number} managerLevel minimum level required
 */
const grantAdminAccessAction = (grantLevel, managerLevel) => ({
  isAccessible: ({ currentAdmin }) => currentAdmin.accessLevel >= managerLevel,
  actionType: "record",
  component: false,
  handler: async (req, res, context) => {
    const { record, currentAdmin } = context;

    try {
      if (res.locals.userId === record.params.id) {
        throw Error("본인 권한 수정 불가");
      }
      if (res.locals.accessLevel !== currentAdmin.accessLevel) {
        throw Error("권한 확인 불가");
      }
      const currentLevel = await verifyAccessLevel(record.params.id);

      // 본인보다 높은 권한의 유저
      if (currentLevel >= currentAdmin.accessLevel) {
        throw Error("권한이 없습니다.");
      }

      if (currentLevel === grantLevel) {
        throw Error("기존 권한과 동일함");
      }

      const newCustomClaims = {
        registered: true,
        admin: grantLevel !== 0,
        accessLevel: grantLevel,
      };

      // update firebase custom claim
      await admin.auth().setCustomUserClaims(record.params.id, newCustomClaims);

      const adminUser = await models.admin.findByPk(record.params.id);

      if (!!adminUser) {
        if (grantLevel === 0) {
          // to normal user
          await adminUser.destroy();
        } else {
          // update accessLevel
          await adminUser.update({ accessLevel: grantLevel });
        }
      } else {
        await models.admin.create({
          id: record.params.id,
          email: record.params.email,
          accessLevel: grantLevel,
        });
      }

      return {
        record: record.toJSON(currentAdmin),
        notice: {
          message: `Access level: ${currentLevel} -> ${grantLevel}`,
          type: "success",
        },
      };
    } catch (error) {
      console.error(error);
      return {
        record: record.toJSON(currentAdmin),
        notice: {
          message: `관리자 등록 실패 - ${error.message}`,
          type: "error",
        },
      };
    }
  },
  guard: "등록하시겠습니까?",
  icon: `Number_${grantLevel}`,
  parent: "grantAdmin",
});

const userInfoResource = {
  resource: models.userInfo,
  ...accessController(3, 2, 3, 9),
};

// add custom actions
userInfoResource.options.actions = {
  grantAdmin: {
    icon: "UserAdmin",
    actionType: "record",
  },
  showAccessLevel: {
    isAccessible: ({ currentAdmin }) => currentAdmin.accessLevel >= 4,
    actionType: "record",
    component: false,
    handler: async (req, res, context) => {
      const { record, currentAdmin } = context;
      try {
        const accessLevel = await verifyAccessLevel(record.params.id);
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: `accessLevel - ${accessLevel}`,
            type: "success",
          },
        };
      } catch (error) {
        console.log(error);
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: `조회 실패 - ${error.message}`,
            type: "error",
          },
        };
      }
    },
    icon: "Checkmark",
    parent: "grantAdmin",
  },
  asNormalUser: {
    ...grantAdminAccessAction(0, 4),
    icon: "Unlink",
  },
  asViewer: grantAdminAccessAction(1, 4),
  asPublisher: grantAdminAccessAction(2, 4),
  asManager: grantAdminAccessAction(3, 4),
  asExecutive: grantAdminAccessAction(4, 9),
};

module.exports = { userInfoResource };

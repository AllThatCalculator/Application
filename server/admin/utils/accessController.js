/**
 * 테이블 권한 설정
 * @param {number} c CREATE 최소 레벨
 * @param {number} r READ 최소 레벨
 * @param {number} u UPDATE 최소 레벨
 * @param {number} d DELETE 최소 레벨
 */
exports.accessController = (c = 3, r = 1, u = 3, d = 3) => ({
  options: {
    actions: {
      // CREATE
      new: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= c)
      },
      // READ
      list: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= r)
      },
      show: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= r)
      },
      search: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= r)
      },
      // UPDATE
      edit: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= u)
      },
      // DELETE
      delete: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= d)
      },
      bulkDelete: {
        isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= d)
      }
    }
  }
});

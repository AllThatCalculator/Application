import axios from "axios";
import { handleUserInfoData } from "../../utils/handleDataToSubmit";

/**
 * 프로필 수정
 * @param {*} userId
 */
async function patchUserInfo(userId, dataToSubmit = {}) {
  try {
    const response = await axios.patch(
      `/api/users/me/profile`,
      handleUserInfoData(dataToSubmit),
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return;
      case 401:
        return;
      default:
        return "404 NOT FOUND";
    }
  }
}

export default patchUserInfo;

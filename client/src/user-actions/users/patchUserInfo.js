import axios from "axios";
import { handleUserInfoData } from "../../utils/handleDataToSubmit";
import { handleErrorUserActions } from "../../utils/handleUserActions";

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
    handleErrorUserActions(error.response);
  }
}

export default patchUserInfo;

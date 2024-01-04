import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 프로필 정보 중 계산기 리스트 가져옴
 * @param {*} userId
 * @param {*} dataToSubmit
 * @returns
 */
async function getUserIdCalculetList(userId, uuid, dataToSubmit = {}) {
  try {
    const response = await axios.get(`/api/users/${uuid}/calculet`, {
      params: dataToSubmit,
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default getUserIdCalculetList;

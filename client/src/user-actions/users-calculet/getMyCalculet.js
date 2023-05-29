import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * id로 마이 계산기 가져오기
 * @param {*} userId
 * @param {*} params
 * @param {*} dataToSubmit
 * @returns
 */
async function getMyCalculet(userId, params, dataToSubmit = {}) {
  try {
    const response = await axios.get(
      `/api/users/me/calculet/${params.calculetId}`,
      {
        params: dataToSubmit,
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

export default getMyCalculet;

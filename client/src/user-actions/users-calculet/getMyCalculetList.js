import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * get my calculet list
 * @param {*} userId
 */
async function getMyCalculetList(userId, dataToSubmit = {}) {
  try {
    const response = await axios.get(`/api/users/me/calculet`, {
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

export default getMyCalculetList;

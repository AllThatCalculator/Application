import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * get my calculet list
 * @param {*} userId
 */
async function getMyCalculetList(userId) {
  try {
    const response = await axios.get(`/api/users/me/calculet`, {
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

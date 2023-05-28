import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * delete my calculet
 * @param {*} userId
 */
async function deleteMyCalculet(userId, dataToSubmit = {}) {
  try {
    const response = await axios.delete(`/api/users/me/calculet`, {
      headers: {
        Authorization: `Bearer ${userId}`,
        ...dataToSubmit,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default deleteMyCalculet;

import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 계정 탈퇴 (firebase deleteUser와 구분하기 위해 My)
 * @param {} userId
 */
async function deleteMyUser(userId) {
  try {
    const response = await axios.delete(`/api/users`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default deleteMyUser;

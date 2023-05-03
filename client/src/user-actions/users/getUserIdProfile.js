import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 프로필 정보 가져옴
 * @param {} userId
 * @returns
 */
async function getUserIdProfile(userId, uuid) {
  try {
    const response = await axios.get(
      `/api/users/${uuid}/profile`,

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

export default getUserIdProfile;

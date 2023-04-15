import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

async function getUserInfo(userId) {
  try {
    const response = await axios.get(`/api/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default getUserInfo;

import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

async function getUserMe(userId) {
  try {
    const response = await axios.get(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default getUserMe;

import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

async function putMyCalculet(userId, dataToSubmit = {}) {
  let data;
  try {
    const response = await axios.put(`/api/users/me/calculet`, dataToSubmit, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
  return data;
}

export default putMyCalculet;

import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 계산 이력 저장
 */
async function postCalculetRecords(dataToSubmit = {}, userId = "") {
  try {
    await axios.post("/api/records", dataToSubmit, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return true;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default postCalculetRecords;

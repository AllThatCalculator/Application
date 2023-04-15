import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 계산 내역 삭제
 * @param {*} userId user id token
 */
async function deleteCalculetRecords(dataToSubmit = {}, userId = "") {
  let data;
  try {
    await axios
      .delete(`/api/records`, {
        data: dataToSubmit, // delete data
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((res) => {
        data = res.data;
      });
    return data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}
export default deleteCalculetRecords;

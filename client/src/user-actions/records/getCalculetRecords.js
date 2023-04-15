import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 계산 내역 불러오는 함수
 * @param {*} calculetId 계산기 id
 * @param {*} userId user id token
 */
async function getCalculetRecords(calculetId = "", userId = "") {
  let data;
  try {
    await axios
      .get(`/api/records/${calculetId}`, {
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
export default getCalculetRecords;

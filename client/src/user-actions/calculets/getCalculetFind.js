import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 계산기 검색 얻어오기
 * @param {*} dataToSubmit : 대분류 | 소분류 | 계산기 제목으로 검색 필터 설정 가능 (모든 쿼리 파라미터는 필수X)
 */
async function getCalculetFind(dataToSubmit = {}) {
  let data;
  try {
    await axios
      .get(`/api/calculets/find`, {
        params: dataToSubmit,
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}
export default getCalculetFind;

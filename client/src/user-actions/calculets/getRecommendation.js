import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 추천 계산기 목록 불러오기
 */
async function getRecommendation() {
  let data;
  try {
    await axios.get(`/api/calculets/recommendation`).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}
export default getRecommendation;

import axios from "axios";

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
    switch (error.response.status) {
      case 400:
        return error.response.data;
      default:
        return;
    }
  }
}
export default getRecommendation;

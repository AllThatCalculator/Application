import axios from "axios";

/**
 * 단위 변환기 가져오기
 */
async function getCalculetConverters() {
  let data;
  try {
    await axios.get(`/api/calculets/converters`).then((response) => {
      // 단위 변환기 (0)
      data = { 0: response.data };
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
export default getCalculetConverters;

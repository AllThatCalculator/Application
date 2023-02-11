import axios from "axios";

/**
 * 계산기 목록 얻어오기
 */
async function getCalculetList() {
  let data;
  try {
    await axios.get(`/api/calculets/`).then((response) => {
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
export default getCalculetList;

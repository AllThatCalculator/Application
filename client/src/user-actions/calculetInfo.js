import axios from "axios";

/**
 * 계산기 정보 get 요청 함수
 */
async function calculetInfo(id) {
  try {
    let data;
    await axios.get(`/api/calculets/${id}`).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 404:
        return error.response.data.message;
      default:
        return "404 NOT FOUND";
    }
  }
}

export default calculetInfo;

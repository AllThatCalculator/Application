import axios from "axios";

/**
 * 계산기 정보 get 요청 함수
 */
async function calculetInfo(id, userId = "") {
  try {
    const response = await axios.get(`/api/calculets/${id}`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return;
      case 401:
        return;
      case 404:
        return error.response.data.message;
      default:
        return "404 NOT FOUND";
    }
  }
}

export default calculetInfo;

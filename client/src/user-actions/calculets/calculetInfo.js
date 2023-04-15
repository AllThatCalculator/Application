import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

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
    handleErrorUserActions(error.response);
  }
}

export default calculetInfo;

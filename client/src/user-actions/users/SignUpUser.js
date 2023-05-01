import axios from "axios";
import { handleUserInfoData } from "../../utils/handleDataToSubmit";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 회원 가입 - 서버에 요청
 * @param {object}
 * dataToSubmit : 서버에 보낼 정보
 * userId : user id token
 */
async function signUpUser(dataToSubmit = {}, userId) {
  try {
    const response = await axios.post(
      "/api/users",
      handleUserInfoData(dataToSubmit),
      {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}
export default signUpUser;

import axios from "axios";

/**
 * 회원 가입 - 서버에 요청
 * @param {object}
 * dataToSubmit : 서버에 보낼 정보
 */
async function signUpUser(dataToSubmit = {}) {
  let data;
  try {
    await axios.post(`/api/users/`, dataToSubmit).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    return error.response.status;
  }
}
export default signUpUser;

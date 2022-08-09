import axios from "axios";

/**
 * 회원 가입 - 서버에 요청
 * @param {object}
 * dataToSubmit : 서버에 보낼 정보
 */
async function signUpUser(dataToSubmit = {}) {
  let data;
  try {
    await axios.post(`/users/`, dataToSubmit).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return error.response.data;
        break;
      case 403:
        break;
    }
  }
}
export default signUpUser;

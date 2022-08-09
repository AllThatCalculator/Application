import axios from "axios";

/**
 * 로그인 - 서버에 요청
 * @param {object}
 * dataToSubmit : 서버에 보낼 정보
 */
async function loginUser(dataToSubmit = {}) {
  let data;
  try {
    await axios.post(`/users/login`, dataToSubmit).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
      case 403:
      case 404:
        return error.response.data;
    }
  }
}
export default loginUser;

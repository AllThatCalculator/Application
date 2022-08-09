import axios from "axios";

/**
 * 로그아웃 - 서버에 요청
 */
async function LogoutUser() {
  let data;
  try {
    await axios.get("/users/logout").then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return error.response.data;
        break;
      case 404:
        break;
    }
  }
}
export default LogoutUser;

import axios from "axios";

/**
 * 로그아웃 - 서버에 요청
 */
async function LogoutUser() {
  let data;
  try {
    await axios.get("/api/users/logout").then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return error.response.data;
      default:
        break;
    }
  }
}
export default LogoutUser;
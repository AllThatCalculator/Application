import axios from "axios";

/**
 * 인가 - 로그인한 사용자인지 확인하기
 * -> 확인하는 거니까 보낼 데이터 없음.
 */
async function AuthUser() {
  let data;
  try {
    await axios.get("/api/users/me").then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 401:
        return error.response.data;
      default:
        return error.response.status;
    }
  }
}
export default AuthUser;

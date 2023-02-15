import axios from "axios";
import URL from "../components/PageUrls";

/**
 * 회원 가입 - 서버에 요청
 * @param {object}
 * dataToSubmit : 서버에 보낼 정보
 * userId : user id token
 */
async function signUpUser(dataToSubmit = {}, userId) {
  const formData = new FormData(); // 서버에 보내기 위한 form
  // img file
  if (dataToSubmit.profileImg === null) {
    formData.append("profileImg", "");
  } else {
    formData.append("profileImg", dataToSubmit.profileImg);
  }
  // user info
  formData.append("userInfo", JSON.stringify(dataToSubmit.userInfo)); // object -> json -> payload로 감싸기

  let data;
  try {
    await axios
      .post(`/api/users`, formData, {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  } catch (error) {
    // console.log(error);
    switch (error.response.status) {
      case 409: // 이미 등록된 상태에서 한 번 더 요청 보냄 error
        window.location.href = URL.CALCULET;
        return;
      default:
        return;
    }
  }
}
export default signUpUser;

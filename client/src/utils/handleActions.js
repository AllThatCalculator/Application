import URL from "../components/PageUrls";
import firebaseAuth from "../firebaseAuth";
import getUserInfo from "../user-actions/getUserInfo";

/**
 * 사용자 정보 가져오는 처리
 * @param {*} idToken
 */
async function handleGetUserInfo(idToken) {
  let result = {
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    email: "",
    birthdate: "",
    sex: "",
  };
  /** set user info */
  await getUserInfo(idToken).then((data) => {
    result = data;
  });
  return result;
}

/**
 * 에러 처리
 * @param {*} codeData : {
 *  "code": 1,
 *  "message": "errorMessage"
 * }
 */
function handleError(codeData) {
  // code 없으면 에러 아님 return false
  if (!Object.keys(codeData).includes("code")) {
    return false;
  }

  // const { code, message } = codeData;
  const { code } = codeData;
  /**
   * 401
   * 2 : firebase에 가입되었으나, DB에 등록되지 않은 유저
   */
  if (code === 2) {
    // 01. 로그아웃
    const request = firebaseAuth.signOutAuth();
    request.then((result) => {
      if (result === true) {
        // 02. 회원가입 화면으로
        window.location.replace(URL.SIGN_UP);
      }
    });
  }
  return true;
}

export { handleGetUserInfo, handleError };

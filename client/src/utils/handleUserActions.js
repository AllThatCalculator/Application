import deleteMyUser from "../user-actions/users/deleteMyUser";
import getUserInfo from "../user-actions/users/getUserInfo";
import getUserMe from "../user-actions/users/getUserMe";
import patchUserInfo from "../user-actions/users/patchUserInfo";
import signUpUser from "../user-actions/users/SignUpUser";

/**
 * 사용자 정보 가져오는 처리
 * @param {*} idToken
 */
async function handleGetUserInfo(idToken) {
  try {
    // let result = {
    //   userName: "",
    //   profileImgSrc: "",
    //   job: "",
    //   bio: "",
    //   email: "",
    //   birthdate: "",
    //   sex: "",
    // };
    /** set user info */
    const response = await getUserInfo(idToken);
    return response;
  } catch (error) {
    return error.code;
  }
}

/**
 * 사용자 정보 가져오는 처리 (me)
 * @param {*} idToken
 */
async function handleGetUserMe(idToken) {
  try {
    // let result = {
    //   userName: "",
    //   profileImgSrc: "",
    // };
    /** get user info */
    const response = await getUserMe(idToken);
    if (!!response) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    return error.code;
  }
}

/**
 * 사용자 프로필 수정
 * @param {*} idToken
 */
async function handlePatchUserInfo(idToken, body) {
  try {
    /** patch user info */
    await patchUserInfo(idToken, body);
    return true;
  } catch (error) {
    return error.code;
  }
}

/**
 * 회원가입
 * @param {*} idToken
 */
async function handleSignUp(body, idToken) {
  try {
    /** sign up user */
    const response = await signUpUser(body, idToken);
    if (response === "/") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.code;
  }
}

/**
 * 계정 탈퇴
 * @param {*} idToken
 */
async function handleDeleteUser(idToken) {
  try {
    /** delete user */
    await deleteMyUser(idToken);
    return true;
  } catch (error) {
    return error.code;
  }
}

// /**
//  * 에러 처리
//  * @param {*} codeData : {
//  *  "code": 1,
//  *  "message": "errorMessage"
//  * }
//  */
// function handleError(codeData) {
//   // code 없으면 에러 아님 return false
//   if (!Object.keys(codeData).includes("code")) {
//     return false;
//   }

//   // const { code, message } = codeData;
//   const { code } = codeData;
//   /**
//    * 401
//    * 2 : firebase에 가입되었으나, DB에 등록되지 않은 유저
//    */
//   if (code === 2) {
//     // 01. 로그아웃
//     const request = firebaseAuth.signOutAuth();
//     request.then((result) => {
//       if (result === true) {
//         // 02. 회원가입 화면으로
//         window.location.replace(URL.SIGN_UP);
//       }
//     });
//   }
//   return true;
// }

export {
  handleGetUserInfo,
  handleGetUserMe,
  handlePatchUserInfo,
  handleSignUp,
  handleDeleteUser,
};

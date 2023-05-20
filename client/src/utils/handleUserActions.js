import URL from "../components/PageUrls";
import deleteMyUser from "../user-actions/users/deleteMyUser";
import getUserInfo from "../user-actions/users/getUserInfo";
import getUserMe from "../user-actions/users/getUserMe";
import patchUserInfo from "../user-actions/users/patchUserInfo";
import signUpUser from "../user-actions/users/SignUpUser";
import firebaseAuth from "../firebaseAuth";
import getUserIdCalculetList from "../user-actions/users-calculet/getUserIdCalculetList";
import getUserIdProfile from "../user-actions/users/getUserIdProfile";
import getCalculetBookmark from "../user-actions/bookmark/getCalculetBookmark";
import getMyCalculetList from "../user-actions/users-calculet/getMyCalculetList";
import deleteMyCalculet from "../user-actions/users-calculet/deleteMyCalculet";
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
 * get user profile
 * @param {*} idToken
 */
async function handleGetUserIdProfile(idToken, uuid) {
  try {
    const response = await getUserIdProfile(idToken, uuid);
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
 * 사용자 프로필에 계산기 리스트
 * @param {*} idToken
 */
async function handleGetUserIdCalculetList(idToken, uuid, body) {
  try {
    /** get user calculet list */
    const response = await getUserIdCalculetList(idToken, uuid, body);
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
 * 사용자 마이 계산기 리스트
 * @param {*} idToken
 */
async function handleGetMyCalculetList(idToken) {
  try {
    /** get my calculet list */
    const response = await getMyCalculetList(idToken);
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
 * 사용자 마이 계산기 삭제
 * @param {*} idToken
 */
async function handleDeleteMyCalculet(idToken, body) {
  try {
    /** delete my calculet list */
    await deleteMyCalculet(idToken, body);
  } catch (error) {
    return error.code;
  }
}

/**
 * get user calculet bookmark
 * @param {*} idToken
 */
async function handleGetCalculetBookmark(idToken) {
  try {
    const response = await getCalculetBookmark(idToken);
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

/**
 * handle error
 * @param {*} responseError
 */
async function handleErrorUserActions(responseError) {
  try {
    if (document.location.pathname === URL.SIGN_UP) {
      return;
    }
    const { status, data } = responseError;

    switch (status) {
      case 400:
        return;
      case 401:
        switch (data.code) {
          case -1: //토큰 없음
            window.location.replace(URL.LOGIN);
            return;
          case 0: //토큰 만료 - 재로그인
          case 1: // 유효하지 않은 토큰
            const result = await firebaseAuth.signOutAuth();
            if (result) {
              window.location.replace(URL.LOGIN);
            }
            return;
          case 2: // firebase에 가입되었으나, DB에 등록되지 않은 유저
            await firebaseAuth.signOutAuth();
            await firebaseAuth.deleteAuth();
            return;
          case 3: // firebase에서 삭제된 유저 (아마도 탈퇴한 유저)
            await firebaseAuth.signOutAuth();
            return;
          default:
            return;
        }
      default:
        return;
    }
  } catch (error) {
    return error.code;
  }
}

export {
  handleGetUserInfo,
  handleGetUserMe,
  handlePatchUserInfo,
  handleGetCalculetBookmark,
  handleSignUp,
  handleDeleteUser,
  handleErrorUserActions,
  handleGetUserIdCalculetList,
  handleGetMyCalculetList,
  handleGetUserIdProfile,
  handleDeleteMyCalculet,
};

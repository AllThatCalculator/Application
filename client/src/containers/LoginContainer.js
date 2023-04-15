import { useState } from "react";
import firebaseAuth from "../firebaseAuth";
import usePage from "../hooks/usePage";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";
import useSnackbar from "../hooks/useSnackbar";
import Login from "../pages/Login";
import useInputs from "../hooks/useInputs";
import {
  FIREBASE_AUTH_ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL,
  FIREBASE_AUTH_ERROR_INVALID_EMAIL,
  FIREBASE_AUTH_ERROR_TOO_MANY_REQUESTS,
  FIREBASE_AUTH_ERROR_USER_NOT_FOUND,
  FIREBASE_AUTH_ERROR_WRONG_PASSWORD,
} from "../constants/auth";
import {
  KEY_LOGIN_ERROR_EMAIL,
  KEY_LOGIN_ERROR_PW,
  KEY_LOGIN_ERROR_EMAIL_FIND_PW,
  ID_INPUT_EMAIL,
  ID_INPUT_PW,
  ID_INPUT_EMAIL_FIND_PW,
} from "../constants/login";
import { handleGetUserMe } from "../utils/handleUserActions";
import { onSetUserInfo } from "../modules/userInfo";

/**
 * 로그인 페이지
 */
function LoginContainer({ isLoggedIn }) {
  /** Redux Dispatch */
  const dispatch = useDispatch();

  // loading state
  const { handleOnLoading, handleOffLoading } = useLoading();

  // error state
  const { handleSetAuthError, handleSetErrorType, handleSetClearError } =
    useError();

  // page handle
  const { signUpPage, calculetPage } = usePage();

  // snackbar handle
  const { openSnackbar } = useSnackbar();

  // inputs handle
  const { values: loginInputs, onChange: setLoginInputs } = useInputs({
    inputEmail: "",
    inputPw: "",
    inputEmailFindPw: "",
  });
  const { inputEmail, inputPw, inputEmailFindPw } = loginInputs;

  // redux state
  const { authError, errorType, isLoading } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
    isLoading: state.loading.isLoading,
  }));

  // find password with email modal state
  const [isOpenFindPwModal, setIsOpenFindPwModal] = useState(false);

  // get user me handle
  async function onGetUserMeHandler() {
    // get token
    const idToken = await firebaseAuth.getAuthState(false);

    // get user me
    let result = await handleGetUserMe(idToken);
    // success 사용자 있음 : me update & 메인 페이지
    if (!!result) {
      dispatch(onSetUserInfo(result));
      calculetPage();
    }
    // error 사용자 없음 : delete(동시에 로그아웃 됨)
    else {
      result = await firebaseAuth.deleteAuth();
      // delete success : 회원가입 페이지 & 스낵바 알림
      if (result === true) {
        signUpPage();
        openSnackbar(
          "basic",
          "회원가입이 필요한 유저입니다.",
          true,
          "top",
          "center",
          3600 // 지속시간
        );
      }
    }
    await handleOffLoading(); // loading stop
  }

  /**
   * 폼 제출
   * - 입력된 이메일과 비밀번호에 따른 경고 안내문 change & 로그인 통과
   */
  async function onClickEmailSignInHandler(event) {
    event.preventDefault();

    await handleOnLoading(); // start loading
    await handleSetClearError(); // init error

    // firebase 통한 이메일&패스워드 로그인
    const result = await firebaseAuth.signInWithEmail(inputEmail, inputPw);

    // 로그인 성공 시, 바로 전 페이지에 있던 곳으로
    if (result === true) {
      // get user me
      onGetUserMeHandler();
    } else {
      // set error
      handleSetAuthError(result);
      handleOffLoading(); // loading stop
      switch (result) {
        case FIREBASE_AUTH_ERROR_INVALID_EMAIL: // 이메일 형식
          handleSetErrorType(KEY_LOGIN_ERROR_EMAIL);
          break;
        case FIREBASE_AUTH_ERROR_USER_NOT_FOUND: // 존재하지 않는 계정
          handleSetErrorType(KEY_LOGIN_ERROR_EMAIL);
          break;
        case FIREBASE_AUTH_ERROR_WRONG_PASSWORD: // 잘못된 비밀번호
          handleSetErrorType(KEY_LOGIN_ERROR_PW);
          break;
        case FIREBASE_AUTH_ERROR_TOO_MANY_REQUESTS: // 너무 많은 요청
          handleSetErrorType(KEY_LOGIN_ERROR_PW);
          break;
        default:
          break;
      }
    }
  }

  /**
   * sign in event
   * handle firebase social login
   */
  async function onEventSocialSignInHandler(social) {
    await handleOnLoading(); // start loading
    await handleSetClearError(); // init error

    const result = await firebaseAuth.signInWithSocial(social);

    // 로그인 성공 시, 메인 화면으로
    if (result === true) {
      // get user me
      onGetUserMeHandler();
    }
    // 존재하지 않는 계정
    else if (result === false) {
      handleSetAuthError(FIREBASE_AUTH_ERROR_USER_NOT_FOUND);
      handleSetErrorType(KEY_LOGIN_ERROR_EMAIL);
      handleOffLoading(); // loading stop
    }
    // handle error code
    else {
      handleSetAuthError(result);
      handleOffLoading(); // loading stop

      switch (result) {
        case FIREBASE_AUTH_ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: // 다른 인증방식으로
          handleSetErrorType(KEY_LOGIN_ERROR_EMAIL);
          break;
        case FIREBASE_AUTH_ERROR_TOO_MANY_REQUESTS:
          handleSetErrorType(KEY_LOGIN_ERROR_PW);
          break;
        default:
          break;
      }
    }
  }

  /**
   * click event
   * handle firebase google login
   */
  function onClickGoogleSignInHandler(event) {
    event.preventDefault();
    onEventSocialSignInHandler("google");
  }

  /**
   * click event
   * handle firebase github login
   */
  function onClickGithubSignInHandler(event) {
    event.preventDefault();
    onEventSocialSignInHandler("github");
  }

  /**
   * 비밀번호 찾기 버튼 이벤트 - modal 띄우기
   */
  function onClickOpenFindPwModal() {
    setIsOpenFindPwModal(true);
  }

  /**
   * 입력한 email로 비밀번호 찾기
   */
  async function onClickFindPwHandler() {
    await handleOnLoading(); // start loading
    await handleSetClearError(); // init error

    const result = await firebaseAuth.findPassword(inputEmailFindPw);

    if (result === true) {
      // 메일 보냄 성공
      openSnackbar(
        "basic",
        "메일을 성공적으로 보냈습니다. 메일을 확인해주세요.",
        false,
        "bottom",
        "left",
        2400 // 지속시간
      );
      setIsOpenFindPwModal(false);
    } else {
      handleSetAuthError(result);
      handleSetErrorType(KEY_LOGIN_ERROR_EMAIL_FIND_PW);
    }
    await handleOffLoading(); // loading stop
  }

  return (
    <>
      <Login
        inputEmail={inputEmail}
        inputPw={inputPw}
        inputEmailFindPw={inputEmailFindPw}
        isLoading={isLoading}
        isOpenFindPwModal={isOpenFindPwModal}
        setIsOpenFindPwModal={setIsOpenFindPwModal}
        authError={authError}
        errorType={errorType}
        onClickEmailSignInHandler={onClickEmailSignInHandler}
        onClickGoogleSignInHandler={onClickGoogleSignInHandler}
        onClickGithubSignInHandler={onClickGithubSignInHandler}
        onClickOpenFindPwModal={onClickOpenFindPwModal}
        onClickFindPwHandler={onClickFindPwHandler}
        signUpPage={signUpPage}
        idErrorEmail={KEY_LOGIN_ERROR_EMAIL}
        idErrorPw={KEY_LOGIN_ERROR_PW}
        idEmailFindPw={KEY_LOGIN_ERROR_EMAIL_FIND_PW}
        setLoginInputs={setLoginInputs}
        idInputEmail={ID_INPUT_EMAIL}
        idInputPw={ID_INPUT_PW}
        idInputEmailFindPw={ID_INPUT_EMAIL_FIND_PW}
      />
    </>
  );
}

export default LoginContainer;

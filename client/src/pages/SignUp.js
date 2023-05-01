import { useEffect, useState } from "react";
import SignUpFirebase from "../components/sign-up/SignUpFirebase";
import SignUpInform from "../components/sign-up/SignUpInform";
import usePreventLeave from "../hooks/usePreventLeave";
import { PageWhiteScreenBox } from "../components/global-components/PageScreenBox";
import { FlexColumnBox } from "../components/global-components/FlexBox";
import useSx from "../hooks/useSx";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import StyledImg from "../components/atom-components/StyledImg";
import usePage from "../hooks/usePage";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";
import { checkSymbols, checkSpace } from "../utils/checkSpecialSymbols";
import checkValidDate from "../utils/checkValidDate";
import firebaseAuth from "../firebaseAuth";
import { handleGetUserMe, handleSignUp } from "../utils/handleUserActions";
import { onSetUserIdToken, onSetUserInfo } from "../modules/userInfo";
import {
  ID_INPUT_BIO,
  ID_INPUT_DATE,
  ID_INPUT_JOB,
  ID_INPUT_MONTH,
  ID_INPUT_SEX,
  ID_INPUT_USER_NAME,
  ID_INPUT_YEAR,
  KEY_ERROR_BIRTHDATE,
  KEY_ERROR_EMAIL,
  KEY_ERROR_PASSWORD,
  KEY_ERROR_PASSWORD_CONFIRM,
  KEY_ERROR_JOB,
  KEY_ERROR_USER_NAME,
  ID_INPUT_EMAIL,
  ID_INPUT_PASSWORD,
  ID_INPUT_PASSWORD_CONFIRM,
} from "../constants/signUp";
import useInputs from "../hooks/useInputs";
import useSelects from "../hooks/useSelects";
import {
  ATC_AUTH_ERROR_INVALID_PASSWORD,
  ATC_VALIDATE_ERROR_INVALID_DATE,
  ATC_VALIDATE_ERROR_SPECIAL_SYMBOLS_JOB,
  ATC_VALIDATE_ERROR_SPECIAL_SYMBOLS_USER_NAME,
  FIREBASE_AUTH_ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL,
  FIREBASE_AUTH_ERROR_EMAIL_ALREADY_IN_USE,
  FIREBASE_AUTH_ERROR_INVALID_EMAIL,
  FIREBASE_AUTH_ERROR_PROVIDER_ALREADY_LINKED,
  FIREBASE_AUTH_ERROR_WEAK_PASSWORD,
} from "../constants/auth";
import useSnackbar from "../hooks/useSnackbar";
import { setAuthError, setClearError, setErrorType } from "../modules/error";

/**
 * 회원가입 페이지
 */
function SignUp({ isLoggedIn }) {
  const { widthSx } = useSx();

  // redux state
  const { isLoading, authError, errorType } = useSelector((state) => ({
    isLoading: state.loading.isLoading,
    authError: state.error.authError,
    errorType: state.error.errorType,
  }));

  // 회원가입 페이지 나갈 때 alert hook
  const preventLeave = usePreventLeave(() => {});
  useEffect(() => {
    preventLeave.enablePrevent();
  }, [preventLeave]);

  // useEffect(() => {
  //   // login 상태면, 튕겨내기
  //   if (isLoggedIn && userName !== "" && idToken !== null) {
  //     // warning solve
  //     window.history.back();
  //   }
  // }, [isLoggedIn, userName, idToken]);

  const { calculetRefreshPage } = usePage();
  const dispatch = useDispatch();

  // loading state
  const { handleOnLoading, handleOffLoading } = useLoading();

  // error state
  const { handleSetAuthError, handleSetErrorType, handleSetClearError } =
    useError();

  const { openSnackbar } = useSnackbar();

  /**
   * inputs handle
   *
   * 프로필 사진 profileImg - type : Blob
   * 닉네임 userName
   * 성별 sex
   * 생년월일 birthdate -> year, month, date
   * 직업 job
   * 자기소개 문구 bio
   */
  const [profileImg, setProfileImg] = useState({ url: "", file: null });
  const { values: signUpInputs, onChange: setSignUpInputs } = useInputs({
    // db
    inputUserName: "",
    inputJob: "",
    inputBio: "",
    // firebase
    inputEmail: "",
    inputPassword: "",
    inputPasswordConfirm: "",
  });
  const { values: signUpSelects, onChange: setSignUpSelects } = useSelects({
    inputSex: "",
    inputYear: "",
    inputMonth: "",
    inputDate: "",
  });
  const {
    inputUserName,
    inputJob,
    inputBio,
    inputEmail,
    inputPassword,
    inputPasswordConfirm,
  } = signUpInputs;
  const { inputSex, inputYear, inputMonth, inputDate } = signUpSelects;

  /** submit disabled handle */
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // input content, symbol check handle
  useEffect(() => {
    dispatch(setClearError()); // init error
    setIsSubmitDisabled(true);

    // 닉네임 : 공백 혹은 특수문자 검사
    if (
      !!inputUserName &&
      (checkSymbols(inputUserName) || checkSpace(inputUserName))
    ) {
      dispatch(setAuthError(ATC_VALIDATE_ERROR_SPECIAL_SYMBOLS_USER_NAME));
      dispatch(setErrorType(KEY_ERROR_USER_NAME));
      return;
    }

    // DB 데이터 타입에 맞게 처리 - 날짜 유효성 검사
    if (!!inputYear && !!inputMonth && !!inputDate) {
      const birthdateDb = inputYear + "-" + inputMonth + "-" + inputDate;
      if (!checkValidDate(birthdateDb)) {
        dispatch(setAuthError(ATC_VALIDATE_ERROR_INVALID_DATE));
        dispatch(setErrorType(KEY_ERROR_BIRTHDATE));
        return;
      }
    }

    // 직업 : 특수문자 검사
    if (!!inputJob && checkSymbols(inputJob)) {
      dispatch(setAuthError(ATC_VALIDATE_ERROR_SPECIAL_SYMBOLS_JOB));
      dispatch(setErrorType(KEY_ERROR_JOB));
      return;
    }

    if (
      !inputUserName ||
      !inputSex ||
      !inputYear ||
      !inputMonth ||
      !inputDate ||
      !inputJob
    ) {
      return;
    }
    setIsSubmitDisabled(false);
  }, [
    inputUserName,
    inputSex,
    inputYear,
    inputMonth,
    inputDate,
    inputJob,
    dispatch,
  ]);

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  async function onSubmitSignUpHandler() {
    await handleSetClearError(); // clear error
    await handleOnLoading(); // loading start

    // 1. get token
    const idToken = await firebaseAuth.getAuthState(false);

    // 2. 유저 조회 요청 : get user me
    const resultBeforeSignUpMe = await handleGetUserMe(idToken);
    // 3-1. 사용자 없음 => success
    if (!resultBeforeSignUpMe) {
      // 서버에 보낼 정보 => body
      // DB 데이터 타입에 맞게 처리
      const birthdateDb = inputYear + "-" + inputMonth + "-" + inputDate;
      let body = {
        profileImg: profileImg.file,
        userInfo: {
          userName: inputUserName,
          bio: inputBio,
          sex: inputSex,
          birthdate: birthdateDb,
          job: inputJob,
        },
      };

      // console.log(body);

      // 4. 회원 정보 삽입
      const resultSignUp = await handleSignUp(body, idToken);
      // success
      if (resultSignUp) {
        // get token
        const idNewToken = await firebaseAuth.getAuthState(true);
        // get user me
        const resultAfterSignUpMe = await handleGetUserMe(idNewToken);
        // success 사용자 있음 : me update & 메인 페이지
        if (!!resultAfterSignUpMe) {
          await dispatch(onSetUserInfo(resultAfterSignUpMe));
          await dispatch(onSetUserIdToken(idNewToken));
          await preventLeave.disablePrevent(); // off event
          await calculetRefreshPage();
        }
      }
    }
    // 3-2. 사용자 있음 => error 409
    else {
      // 4. 로그아웃
      const resultSignOut = await firebaseAuth.signOutAuth();
      if (resultSignOut) {
        openSnackbar(
          "error",
          "이미 사용중인 이메일입니다.",
          true,
          "top",
          "center",
          2400 // 지속시간
        );
      }
    }
    await handleOffLoading(); // loading stop
  }

  const [isOpenProfileImgPopUp, setIsOpenProfileImgPopUp] = useState(false);

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  async function onClickEmailSignUpHandler(event) {
    event.preventDefault();
    await handleOnLoading(); // start loading
    await handleSetClearError(); // init error

    // 비밀번호 & 비밀번호 확인 비교
    if (inputPassword !== inputPasswordConfirm) {
      handleSetAuthError(ATC_AUTH_ERROR_INVALID_PASSWORD);
      handleSetErrorType(KEY_ERROR_PASSWORD_CONFIRM);
      handleOffLoading(); // loading stop
      return;
    }

    // firebase 통한 이메일&패스워드 회원가입 진행
    const result = await firebaseAuth.signUpWithEmail(
      inputEmail,
      inputPassword
    );
    if (result === true) {
      // db signup
      onSubmitSignUpHandler();
    } else {
      handleSetAuthError(result);
      handleOffLoading(); // loading stop
      switch (result) {
        case FIREBASE_AUTH_ERROR_INVALID_EMAIL: // 이메일 형식 아님
          handleSetErrorType(KEY_ERROR_EMAIL);
          break;
        case FIREBASE_AUTH_ERROR_EMAIL_ALREADY_IN_USE: // 이미 사용중인 계정
          handleSetErrorType(KEY_ERROR_EMAIL);
          break;
        case FIREBASE_AUTH_ERROR_PROVIDER_ALREADY_LINKED:
          handleSetErrorType(KEY_ERROR_EMAIL);
          break;
        case FIREBASE_AUTH_ERROR_WEAK_PASSWORD: // 비밀번호 보안 취약
          handleSetErrorType(KEY_ERROR_PASSWORD);
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

    const result = await firebaseAuth.signUpWithSocial(social);

    if (result === true) {
      // db signup
      onSubmitSignUpHandler();
    }
    // else if (result === false) {
    //   handleSetAuthError(FIREBASE_AUTH_ERROR_PROVIDER_ALREADY_LINKED); //이미 있는 계정
    //   handleSetErrorType(KEY_ERROR_EMAIL);
    //   handleOffLoading(); // loading stop
    // }
    else {
      handleSetAuthError(result);
      handleOffLoading(); // loading stop
      switch (result) {
        case FIREBASE_AUTH_ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: // 다른 인증 방식
          handleSetErrorType(KEY_ERROR_EMAIL);
          break;
        default:
          break;
      }
    }
  }

  /**
   * firebase google 회원가입
   */
  function onClickGoogleSignUpHandler(event) {
    event.preventDefault();
    onEventSocialSignInHandler("google");
  }

  /**
   * firebase github 회원가입
   */
  function onClickGithubSignUpHandler(event) {
    event.preventDefault();
    onEventSocialSignInHandler("github");
  }

  return (
    <PageWhiteScreenBox
      container
      sx={{
        justifyContent: "center",
        pointerEvents: isLoading ? "none" : "auto",
        paddingTop: "8.4rem",
      }}
    >
      <FlexColumnBox
        sx={{
          ...widthSx,
          maxWidth: "48rem",
        }}
      >
        <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
        {isLoading && <LinearProgress />}
        <SignUpInform
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          isOpenProfileImgPopUp={isOpenProfileImgPopUp}
          setIsOpenProfileImgPopUp={setIsOpenProfileImgPopUp}
          errorType={errorType}
          authError={authError}
          inputUserName={inputUserName}
          inputSex={inputSex}
          inputYear={inputYear}
          inputMonth={inputMonth}
          inputDate={inputDate}
          inputJob={inputJob}
          inputBio={inputBio}
          setSignUpInputs={setSignUpInputs}
          setSignUpSelects={setSignUpSelects}
          keyErrorUserName={KEY_ERROR_USER_NAME}
          keyErrorBirthdate={KEY_ERROR_BIRTHDATE}
          keyErrorJob={KEY_ERROR_JOB}
          idInputUserName={ID_INPUT_USER_NAME}
          idInputSex={ID_INPUT_SEX}
          idInputYear={ID_INPUT_YEAR}
          idInputMonth={ID_INPUT_MONTH}
          idInputDate={ID_INPUT_DATE}
          idInputJob={ID_INPUT_JOB}
          idInputBio={ID_INPUT_BIO}
        />
        <SignUpFirebase
          errorType={errorType}
          authError={authError}
          inputEmail={inputEmail}
          inputPassword={inputPassword}
          inputPasswordConfirm={inputPasswordConfirm}
          setSignUpInputs={setSignUpInputs}
          keyErrorEmail={KEY_ERROR_EMAIL}
          keyErrorPassword={KEY_ERROR_PASSWORD}
          keyErrorPasswordConfirm={KEY_ERROR_PASSWORD_CONFIRM}
          idInputEmail={ID_INPUT_EMAIL}
          idInputPassword={ID_INPUT_PASSWORD}
          idInputPasswordConfirm={ID_INPUT_PASSWORD_CONFIRM}
          onClickEmailSignUpHandler={onClickEmailSignUpHandler}
          onClickGoogleSignUpHandler={onClickGoogleSignUpHandler}
          onClickGithubSignUpHandler={onClickGithubSignUpHandler}
          isSubmitDisabled={isSubmitDisabled}
        />
      </FlexColumnBox>
    </PageWhiteScreenBox>
  );
}
export default SignUp;

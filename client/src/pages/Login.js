import { useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import firebaseAuth from "../firebaseAuth";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { PageWhiteScreenBox } from "../components/global-components/PageScreenBox";
import {
  FlexBox,
  FlexColumnBox,
} from "../components/global-components/FlexBox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  BasicButton,
  CaptionButton,
} from "../components/atom-components/Buttons";
import usePage from "../hooks/usePage";
import useSx from "../hooks/useSx";
import { useSelector } from "react-redux";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";
import FindPwFormDialog from "../components/login/FindPwFormDialog";
import useSnackbar from "../hooks/useSnackbar";
import StyledImg from "../components/atom-components/StyledImg";
import StyledPwTextField from "../components/global-components/StyledPwTextField";

/**
 * 로고 스타일 정의 (구글, 깃허브)
 */
const Logo = styled.img`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

/**
 * 로그인 페이지
 */
function Login({ isLoggedIn }) {
  // loading state
  const { handleOnLoading, handleOffLoading } = useLoading();

  // error state
  const { handleSetAuthError, handleSetErrorType, handleSetClearError } =
    useError();

  const { signUpPage, backPage } = usePage();
  const { widthSx } = useSx();

  // snackbar
  const { openSnackbar } = useSnackbar();

  const email = useInput("");
  const pw = useInput("");
  /** find passward */
  const inputEmailToFindPw = useInput("");

  // redux state
  const { authError, errorType, isLoading } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
    isLoading: state.loading.isLoading,
  }));

  // error id
  const ERROR_EMAIL = "login-email";
  const ERROR_PW = "login-pw";
  const ERROR_EMAIL_FIND_PW = "login-email-find-pw";

  /**
   * 폼 제출
   * - 입력된 이메일과 비밀번호에 따른 경고 안내문 change & 로그인 통과
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    handleOnLoading(); // loading start
    handleSetClearError();

    // firebase 통한 이메일&패스워드 로그인
    const request = firebaseAuth.signInWithEmail(email.value, pw.value);
    request.then((result) => {
      if (result === true) {
        // 로그인 성공 시, 바로 전 페이지에 있던 곳으로
        backPage();
      } else {
        // set error
        handleSetAuthError(result);
        switch (result) {
          case "auth/invalid-email": // 이메일 형식
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/user-not-found": // 존재하지 않는 계정
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/wrong-password": // 잘못된 비밀번호
            handleSetErrorType(ERROR_PW);
            break;
          default:
            break;
        }
      }
      handleOffLoading(); // loading stop
    });
  }

  /**
   * firebase google 로그인
   */
  function googleSignIn(event) {
    handleSetClearError();
    const request = firebaseAuth.signInWithSocial("google");
    request.then((result) => {
      handleOnLoading(); // loading start
      if (result === true) {
        // 로그인 성공 시, 바로 전 페이지에 있던 곳으로
        backPage();
      } else if (result === false) {
        handleSetAuthError("auth/user-not-found"); // 존재하지 않는 계정
        handleSetErrorType(ERROR_EMAIL);
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/account-exists-with-different-credential": // 다른 인증방식으로
            handleSetErrorType(ERROR_EMAIL);
            break;
          default:
            break;
        }
      }
      handleOffLoading(); // loading stop
    });
  }

  /**
   * firebase github 로그인
   */
  function githubSignIn(event) {
    handleSetClearError();
    const request = firebaseAuth.signInWithSocial("github");
    request.then((result) => {
      handleOnLoading(); // loading start

      if (result === true) {
        // 로그인 성공 시, 메인 화면으로
        backPage();
      } else if (result === false) {
        handleSetAuthError("auth/user-not-found"); // 존재하지 않는 계정
        handleSetErrorType(ERROR_EMAIL);
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/account-exists-with-different-credential": // 다른 인증방식으로
            handleSetErrorType(ERROR_EMAIL);
            break;
          default:
            break;
        }
      }
      handleOffLoading(); // loading stop
    });
  }

  const [isOpenFindPwModal, setIsOpenFindPwModal] = useState(false);
  /**
   * 비밀번호 찾기 버튼 이벤트 - modal 띄우기
   */
  function onFindPwModal() {
    setIsOpenFindPwModal(true);
  }
  /**
   * 입력한 email로 비밀번호 찾기
   */
  function handleOnFindPw() {
    handleSetClearError();
    const request = firebaseAuth.findPassword(inputEmailToFindPw.value);
    request.then((result) => {
      handleOnLoading(); // loading start
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
        handleSetErrorType(ERROR_EMAIL_FIND_PW);
      }
      handleOffLoading(); // loading stop
    });
  }

  /** 비밀번호 숨김 상태 */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // 소셜 로그인 버튼 리스트
  const socailLoginList = [
    {
      icon: (
        <Logo src="https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg" />
      ),
      text: "Google 계정으로 로그인",
      onClick: googleSignIn,
    },
    {
      icon: <Logo src="/svgs/github-mark.svg" />,
      text: "GitHub 계정으로 로그인",
      onClick: githubSignIn,
    },
  ];

  // useEffect(() => {
  //   // login 상태면, 튕겨내기
  //   if (isLoggedIn) {
  //     // warning solve
  //     // window.history.back();
  //     backPage();
  //   }
  // }, [isLoggedIn, backPage]);

  return (
    <>
      <PageWhiteScreenBox
        container
        sx={{
          justifyContent: "center",
          pointerEvents: isLoading ? "none" : "auto",
          paddingTop: "8.4rem",
        }}
      >
        <FlexColumnBox sx={{ ...widthSx }}>
          <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
          {isLoading && <LinearProgress />}
          <Card variant="outlined">
            <CardContent>
              <FlexColumnBox gap="1.6rem">
                <FlexColumnBox gap="1.6rem">
                  <TextField
                    required
                    fullWidth
                    label="이메일"
                    value={email.value}
                    onChange={email.onChange}
                    error={errorType === ERROR_EMAIL}
                    helperText={errorType === ERROR_EMAIL && authError}
                  />
                  <StyledPwTextField
                    id={ERROR_PW}
                    required={true}
                    label="비밀번호"
                    value={pw.value}
                    handleOnChange={pw.onChange}
                    error={errorType === ERROR_PW}
                    helperText={errorType === ERROR_PW && authError}
                  />
                </FlexColumnBox>
                <CaptionButton text="비밀번호 찾기" onClick={onFindPwModal} />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!email.value || !pw.value}
                  onClick={onSubmitHandler}
                >
                  로그인하기
                </Button>
                <FlexBox sx={{ justifyContent: "center" }}>
                  <Typography variant="caption" sx={{ mr: "0.8rem" }}>
                    계정이 없으신가요?
                  </Typography>
                  <CaptionButton text="회원가입하기" onClick={signUpPage} />
                </FlexBox>
              </FlexColumnBox>
            </CardContent>
          </Card>
          <Grid container>
            <Grid item xs>
              <Divider>또는</Divider>
            </Grid>
          </Grid>
          {/* 소셜 로그인 버튼 */}
          {socailLoginList.map((item) => (
            <BasicButton
              key={item.text}
              icon={item.icon}
              text={item.text}
              onClick={item.onClick}
            />
          ))}
        </FlexColumnBox>
      </PageWhiteScreenBox>
      {/* find passward */}
      <FindPwFormDialog
        isOpen={isOpenFindPwModal}
        setIsOpen={setIsOpenFindPwModal}
        value={inputEmailToFindPw.value}
        onChange={inputEmailToFindPw.onChange}
        handleOnSubmit={handleOnFindPw}
        inputId={ERROR_EMAIL_FIND_PW}
      />
    </>
  );
}

export default Login;

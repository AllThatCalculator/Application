import { useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import firebaseAuth from "../../firebaseAuth";
// import ModalEmailForm from "./ModalEmailForm";
import { BasicButton, CaptionButton } from "../atom-components/Buttons";
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
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import usePage from "../../hooks/usePage";
import { useSelector } from "react-redux";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";
// import useSx from "../../hooks/useSx";

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
 * 회원가입 페이지
 */
function SignUpFirebase({ activateComponent }) {
  const { loginPage } = usePage();

  // loading state
  const { handleOnLoading, handleOffLoading } = useLoading();
  // error state
  const { handleSetAuthError, handleSetErrorType, handleSetClearError } =
    useError();

  // redux state
  const { authError, errorType } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
  }));

  // error id
  const ERROR_EMAIL = "sign-up-email";
  const ERROR_PW = "sign-up-pw";
  const ERROR_PW_CONFIRM = "sign-up-pw-confirm";

  // input state
  const email = useInput("");
  const pw = useInput("");
  const pwConfirmation = useInput("");

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    handleOnLoading(); // loading start
    handleSetClearError();

    // 비밀번호 & 비밀번호 확인 비교
    if (pw.value !== pwConfirmation.value) {
      handleSetAuthError("invalid-password");
      handleSetErrorType(ERROR_PW_CONFIRM);
      handleOffLoading(); // loading stop
      return;
    }

    // firebase 통한 이메일&패스워드 회원가입 진행
    const request = firebaseAuth.signUpWithEmail(email.value, pw.value);
    request.then((result) => {
      if (result === true) {
        // 성공 시, 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        activateComponent();
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/invalid-email": // 이메일 형식 아님
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/email-already-in-use": // 이미 사용중인 계정
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/provider-already-linked":
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/weak-password": // 비밀번호 보안 취약
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
   * firebase google 회원가입
   */
  function googleSignUp(event) {
    handleSetClearError();
    const request = firebaseAuth.signUpWithSocial("google");
    request.then((result) => {
      handleOnLoading(); // loading start

      if (result === true) {
        // 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        activateComponent();
      } else if (result === false) {
        handleSetAuthError("auth/provider-already-linked"); //이미 있는 계정
        handleSetErrorType(ERROR_EMAIL);
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/account-exists-with-different-credential": // 다른 인증 방식
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
   * firebase github 회원가입
   */
  function githubSignUp(event) {
    handleSetClearError();
    const request = firebaseAuth.signUpWithSocial("github");
    request.then((result) => {
      handleOnLoading(); // loading start

      if (result === true) {
        // 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        activateComponent();
      } else if (result === false) {
        handleSetAuthError("auth/provider-already-linked"); //이미 있는 계정
        handleSetErrorType(ERROR_EMAIL);
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/account-exists-with-different-credential": // 다른 인증 방식
            handleSetErrorType(ERROR_EMAIL);
            break;
          default:
            break;
        }
      }
      handleOffLoading(); // loading stop
    });
  }

  /** 비밀번호 숨김 상태 */
  // 비밀번호 숨김 상태
  const [showPassword, setShowPassword] = useState(false);
  // 비밀번호 확인 숨김 상태
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }
  function handleClickShowPasswordConfirm() {
    setShowPasswordConfirm((show) => !show);
  }
  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  // 소셜 회원가입 버튼 리스트
  const socailSignUpList = [
    {
      icon: (
        <Logo src="https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg" />
      ),
      text: "Google 계정으로 회원가입",
      onClick: googleSignUp,
    },
    {
      icon: <Logo src="/svgs/github-mark.svg" />,
      text: "GitHub 계정으로 회원가입",
      onClick: githubSignUp,
    },
  ];

  return (
    <>
      {/* {modalEmailActive && <ModalEmailForm handleClose={modalEmailClose} />} */}
      <Card variant="outlined">
        <CardContent>
          <FlexColumnBox gap="1.6rem">
            <FlexColumnBox gap="1.6rem">
              <TextField
                // id="outlined-name"
                required
                fullWidth
                label="이메일"
                value={email.value}
                onChange={email.onChange}
                error={errorType === ERROR_EMAIL}
                helperText={errorType === ERROR_EMAIL && authError}
              />
              <FormControl
                required
                fullWidth
                variant="outlined"
                error={errorType === ERROR_PW}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  비밀번호
                </InputLabel>
                <OutlinedInput
                  value={pw.value}
                  onChange={pw.onChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="비밀번호"
                />
                <FormHelperText error>
                  {errorType === ERROR_PW && authError}
                </FormHelperText>
              </FormControl>
              <FormControl
                required
                fullWidth
                variant="outlined"
                error={errorType === ERROR_PW_CONFIRM}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  비밀번호 확인
                </InputLabel>
                <OutlinedInput
                  value={pwConfirmation.value}
                  onChange={pwConfirmation.onChange}
                  type={showPasswordConfirm ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="비밀번호 확인"
                />
                <FormHelperText error>
                  {errorType === ERROR_PW_CONFIRM && authError}
                </FormHelperText>
              </FormControl>
            </FlexColumnBox>
            <Button
              type="submit"
              variant="contained"
              onClick={onSubmitHandler}
              disabled={!email.value || !pw.value || !pwConfirmation.value}
            >
              회원가입하기
            </Button>
            <FlexBox sx={{ justifyContent: "center" }}>
              <Typography variant="caption" sx={{ mr: "0.8rem" }}>
                계정이 이미 있으신가요?
              </Typography>
              <CaptionButton text="로그인하기" onClick={loginPage} />
            </FlexBox>
          </FlexColumnBox>
        </CardContent>
      </Card>

      <Grid container>
        <Grid item xs>
          <Divider>또는</Divider>
        </Grid>
      </Grid>
      {/* 소셜 회원가입 버튼 */}
      {socailSignUpList.map((item) => (
        <BasicButton
          key={item.text}
          icon={item.icon}
          text={item.text}
          onClick={item.onClick}
        />
      ))}
    </>
  );
}

export default SignUpFirebase;

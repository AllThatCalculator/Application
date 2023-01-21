import { useEffect, useState } from "react";
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
import useSx from "../../hooks/useSx";

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
  const { widthSx } = useSx();

  // 이메일&패스워드 입력 팝업창
  const [modalEmailActive, setModalEmailActive] = useState(false);

  const email = useInput("");
  const pw = useInput("");
  const pwConfirmation = useInput("");

  // 주의 문구 여부 : 비밀번호 & 비밀번호 확인 비교
  const [warningPw, setWarningPw] = useState("");

  // 주의 문구 여부 : 다 입력되었는지 여부 & 요청 정보 오류
  const [warningAll, setWarningAll] = useState("");

  // 주의 문구 여부 : 가입하기 버튼 클릭 후 (이미 존재 계정, 비밀번호 유효성, 이메일 형식)
  const [warningSignUp, setWarningSignUp] = useState("");

  // 비밀번호 & 비밀번호 확인 같은지 검사
  useEffect(() => {
    if (pw.value !== pwConfirmation.value) {
      setWarningPw("비밀번호가 일치하지 않습니다.");
    } else setWarningPw("");
  }, [pw.value, pwConfirmation.value]);

  function modalEmailClose() {
    setModalEmailActive(false);
  }

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    // 비밀번호 & 비밀번호 확인 비교
    if (warningPw) return;
    // 다 입력했는지 확인
    if (!email.value || !pw.value || !pwConfirmation.value) {
      setWarningAll("모든 사항을 입력해 주세요.");
      return;
    }
    setWarningAll("");

    // firebase 통한 이메일&패스워드 회원가입 진행
    // const email = address.value + "@" + domain;
    const request = firebaseAuth.signUpWithEmail(email.value, pw.value);
    request.then((result) => {
      if (result === true) {
        // 성공 시, 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        activateComponent();
      } else {
        switch (result) {
          case "auth/email-already-in-use":
            setWarningSignUp("이미 존재하는 계정입니다.");
            break;
          case "auth/weak-password":
            setWarningSignUp("6자리 이상 비밀번호를 입력해주세요.");
            break;
          case "auth/invalid-email":
            setWarningSignUp("이메일 계정 형식을 올바르게 입력해주세요.");
            break;
          default:
            break;
        }
      }
    });
  }

  /**
   * firebase google 회원가입
   */
  function googleSignUp(event) {
    setWarningSignUp("");
    const request = firebaseAuth.signUpWithSocial("google");
    request.then((result) => {
      if (result === true) {
        // 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        activateComponent();
      } else if (result === false) {
        setWarningSignUp("이미 존재하는 계정입니다.");
      } else {
        switch (result) {
          case "auth/account-exists-with-different-credential":
            setWarningSignUp("다른 인증 방식으로 존재하는 계정입니다.");
            break;
          default:
            break;
        }
      }
    });
  }

  /**
   * firebase github 회원가입
   */
  function githubSignUp(event) {
    setWarningSignUp("");
    const request = firebaseAuth.signUpWithSocial("github");
    request.then((result) => {
      if (result === true) {
        // 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        activateComponent();
      } else if (result === false) {
        setWarningSignUp("이미 존재하는 계정입니다.");
      } else {
        switch (result) {
          case "auth/account-exists-with-different-credential":
            setWarningSignUp("다른 인증 방식으로 존재하는 계정입니다.");
            break;
          default:
            break;
        }
      }
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
      icon: <Logo src="/img/GitHub-Mark-32px.png" />,
      text: "Github 계정으로 회원가입",
      onClick: githubSignUp,
    },
  ];

  return (
    <>
      {/* {modalEmailActive && <ModalEmailForm handleClose={modalEmailClose} />} */}
      <form onSubmit={onSubmitHandler}>
        <Card variant="outlined">
          <CardContent>
            <FlexColumnBox gap="1.6rem">
              {/* <form onSubmit={onSubmitHandler}> */}
              <FlexColumnBox gap="1.6rem">
                <TextField
                  // id="outlined-name"
                  required
                  fullWidth
                  label="이메일"
                  value={email.value}
                  onChange={email.onChange}
                />
                <FormControl
                  required
                  fullWidth
                  variant="outlined"
                  error={warningPw !== ""}
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
                  <FormHelperText error>{warningPw}</FormHelperText>
                </FormControl>
                <FormControl required fullWidth variant="outlined">
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
                  {/* <FormHelperText error>{warningAll}</FormHelperText> */}
                </FormControl>
              </FlexColumnBox>
              {/* </form> */}

              <Button
                type="submit"
                variant="contained"
                onClick={onSubmitHandler}
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
      </form>

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

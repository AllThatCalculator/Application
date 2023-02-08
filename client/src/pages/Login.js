import { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledImg } from "../components/atom-components/BoxIcon";
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
import { useDispatch, useSelector } from "react-redux";
import { setAuthError, setErrorType } from "../modules/error";

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
function Login() {
  /** Redux State */
  const dispatch = useDispatch();

  const { signUpPage, backPage } = usePage();
  const { widthSx } = useSx();

  const email = useInput("");
  const pw = useInput("");

  // error state
  const { authError, errorType, idToken } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
    idToken: state.userInfo.idToken,
  }));

  // error id
  const ERROR_EMAIL = "login-email";
  const ERROR_PW = "login-pw";

  /** set error */
  function handleSetAuthError(data) {
    dispatch(setAuthError(data));
  }
  // set error type
  function handleSetErrorType(data) {
    dispatch(setErrorType(data));
  }

  /**
   * 폼 제출
   * - 입력된 이메일과 비밀번호에 따른 경고 안내문 change & 로그인 통과
   */
  function onSubmitHandler(event) {
    event.preventDefault();

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
    });
  }

  /**
   * firebase google 로그인
   */
  function googleSignIn(event) {
    const request = firebaseAuth.signInWithSocial("google");
    request.then((result) => {
      if (result === true) {
        // 로그인 성공 시, 바로 전 페이지에 있던 곳으로
        backPage();
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/user-not-found": // 존재하지 않는 계정
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/account-exists-with-different-credential": // 다른 인증방식으로
            handleSetErrorType(ERROR_EMAIL);
            break;
          default:
            break;
        }
      }
    });
  }

  /**
   * firebase github 로그인
   */
  function githubSignIn(event) {
    const request = firebaseAuth.signInWithSocial("github");
    request.then((result) => {
      if (result === true) {
        // 로그인 성공 시, 메인 화면으로
        backPage();
      } else {
        handleSetAuthError(result);
        switch (result) {
          case "auth/user-not-found": // 존재하지 않는 계정
            handleSetErrorType(ERROR_EMAIL);
            break;
          case "auth/account-exists-with-different-credential": // 다른 인증방식으로
            handleSetErrorType(ERROR_EMAIL);
            break;
          default:
            break;
        }
      }
    });
  }

  /**
   * 비밀번호 찾기 버튼 이벤트
   */
  function onFindPw() {
    //console.log("비밀번호 찾으러 가기");
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
      icon: <Logo src="/img/GitHub-Mark-32px.png" />,
      text: "Github 계정으로 로그인",
      onClick: githubSignIn,
    },
  ];

  useEffect(() => {
    // 이미 로그인 되어 있으면, 뒤로 가기
    if (idToken !== null) {
      backPage();
    }
  }, [idToken, backPage]);

  return (
    <PageWhiteScreenBox container sx={{ justifyContent: "center" }}>
      <FlexColumnBox sx={{ ...widthSx }}>
        <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
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
                  <InputLabel>비밀번호</InputLabel>
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
                  <FormHelperText>
                    {errorType === ERROR_PW && authError}
                  </FormHelperText>
                </FormControl>
              </FlexColumnBox>
              <CaptionButton text="비밀번호 찾기" onClick={onFindPw} />
              <Button
                type="submit"
                variant="contained"
                disabled={email.value === "" || pw.value === ""}
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
  );
}

/* <WrapperPad gap="20px">
<BoxBorder gap="20px">
  <BoxTitle content="로그인" />
  <WrapperStretch gap="10px">
    <WriteInform
      email={email.value}
      pw={pw.value}
      changeEmail={email.onChange}
      changePw={pw.onChange}
    />
    {warning && <WarningGuide content={warning} />}
    <WrapperFind>
      <BtnText onClick={onFindPw} text="비밀번호 찾기" />
    </WrapperFind>
  </WrapperStretch>
  <WrapperStretch>
    <BtnIndigo type="submit" text="로그인하기" />
  </WrapperStretch>
  <ActGuide
    guide="계정이 없으신가요?"
    lead="회원가입하기"
    onClick={() => navigate(URL.SIGN_UP)}
  />
</BoxBorder>

<OtherLine />
<WrapperCursor >
  <FlexRowLayout gap="20px">
    <Logo src="/svgs/btn_google_light_normal_ios.svg" />
    <Font font="text200">Google 계정으로 로그인 하기</Font>
  </FlexRowLayout>
</WrapperCursor>
<WrapperCursor onClick={githubSignIn}>
  <FlexRowLayout gap="20px">
    
    <Font font="text200">Github 계정으로 로그인 하기</Font>
  </FlexRowLayout>
</WrapperCursor>
</WrapperPad> */

export default Login;

// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import { BoxBorder } from "../components/atom-components/BoxBorder";
// import { StyledImg } from "../components/atom-components/BoxIcon";
// import BoxTitle from "../components/atom-components/BoxTitle";
// import {
//   BtnIndigo,
//   BtnText,
// } from "../components/atom-components/ButtonTemplate";
// import WarningGuide from "../components/global-components/WarningGuide";
// import {
//   ContentLayout,
//   FlexColumnLayout,
//   FlexRowLayout,
//   White300Layout,
// } from "../components/Layout";
// import WriteInform from "../components/login/WriteInform";
// import useInput from "../hooks/useInput";
// import { useNavigate } from "react-router-dom";
// import ActGuide from "../components/sign-up/ActGuide";
// import URL from "../components/PageUrls";
// import { Font } from "../components/atom-components/StyledText";
// import OtherLine from "../components/sign-up/OtherLine";

// import firebaseAuth from "../firebaseAuth";

// /**
//  * 흰색 뒷 배경
//  */
// const StyledWhite300 = styled(White300Layout)`
//   position: fixed;
//   top: 60px;
//   bottom: 0;
//   z-index: -1;
// `;
// /**
//  * 로그인 크기 346px
//  * 윗부분에 패딩을 주기 위한 스타일 정의
//  */
// const WrapperPad = styled(ContentLayout)`
//   flex-direction: column;
//   width: 346px;
//   padding: 50px 0px;
//   gap: ${(props) => props.gap};
// `;
// /**
//  * 로그인하기 버튼 양쪽으로 꽉 차게 스타일 정의
//  */
// const WrapperStretch = styled(FlexColumnLayout)`
//   width: 100%;
// `;
// /**
//  * 비밀번호 찾기 버튼 정렬 스타일 정의
//  */
// const WrapperFind = styled(FlexRowLayout)`
//   justify-content: flex-end;
// `;

// /**
//  * 로고 스타일 정의 (구글, 깃허브)
//  */
// const Logo = styled.img`
//   width: 24px;
//   height: 24px;
//   align-items: center;
//   justify-content: center;
// `;

// /**
//  * 버튼 커서 스타일 정의
//  */
// const WrapperCursor = styled(BoxBorder)`
//   cursor: pointer;
// `;

// /**
//  * 로그인 페이지
//  */
// function Login() {
//   const email = useInput("");
//   const pw = useInput("");
//   const [warning, setWarning] = useState("");
//   const navigate = useNavigate();

//   // 입력 변경 사항 있을 시, 회원가입 후 경고 메세지 초기화
//   useEffect(() => {
//     setWarning("");
//   }, [email.value, pw.value]);

//   /**
//    * 폼 제출
//    * - 입력된 이메일과 비밀번호에 따른 경고 안내문 change & 로그인 통과
//    */
//   function onSubmitHandler(event) {
//     event.preventDefault();
//     if (!email.value || !pw.value) {
//       setWarning("이메일과 비밀번호를 입력해주세요.");
//       return;
//     }

//     // firebase 통한 이메일&패스워드 로그인
//     const request = firebaseAuth.signInWithEmail(email.value, pw.value);
//     request.then((result) => {
//       if (result === true) {
//         // 로그인 성공 시, 메인 화면으로
//         navigate("/");
//       } else {
//         switch (result) {
//           case "auth/user-not-found":
//             setWarning("존재하지 않는 계정입니다.");
//             break;
//           case "auth/wrong-password":
//             setWarning("잘못된 비밀번호입니다.");
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   }

//   /**
//    * firebase google 로그인
//    */
//   function googleSignIn(event) {
//     setWarning("");
//     const request = firebaseAuth.signInWithSocial("google");
//     request.then((result) => {
//       if (result === true) {
//         // 로그인 성공 시, 메인 화면으로
//         navigate("/");
//       } else if (result === false) {
//         setWarning("존재하지 않는 계정입니다.");
//       } else {
//         switch (result) {
//           case "auth/account-exists-with-different-credential":
//             setWarning("다른 인증 방식으로 존재하는 계정입니다.");
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   }

//   /**
//    * firebase github 로그인
//    */
//   function githubSignIn(event) {
//     setWarning("");
//     const request = firebaseAuth.signInWithSocial("github");
//     request.then((result) => {
//       if (result === true) {
//         // 로그인 성공 시, 메인 화면으로
//         navigate("/");
//       } else if (result === false) {
//         setWarning("존재하지 않는 계정입니다.");
//       } else {
//         switch (result) {
//           case "auth/account-exists-with-different-credential":
//             setWarning("다른 인증 방식으로 존재하는 계정입니다.");
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   }

//   /**
//    * 비밀번호 찾기 버튼 이벤트
//    */
//   function onFindPw() {
//     //console.log("비밀번호 찾으러 가기");
//   }
//   return (
//     <>
//       <StyledWhite300 />
//       <WrapperPad gap="20px">
//         <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
//         <form onSubmit={onSubmitHandler}>
//           <BoxBorder gap="20px">
//             <BoxTitle content="로그인" />
//             <WrapperStretch gap="10px">
//               <WriteInform
//                 email={email.value}
//                 pw={pw.value}
//                 changeEmail={email.onChange}
//                 changePw={pw.onChange}
//               />
//               {warning && <WarningGuide content={warning} />}
//               <WrapperFind>
//                 <BtnText onClick={onFindPw} text="비밀번호 찾기" />
//               </WrapperFind>
//             </WrapperStretch>
//             <WrapperStretch>
//               <BtnIndigo type="submit" text="로그인하기" />
//             </WrapperStretch>
//             <ActGuide
//               guide="계정이 없으신가요?"
//               lead="회원가입하기"
//               onClick={() => navigate(URL.SIGN_UP)}
//             />
//           </BoxBorder>
//         </form>
//         <OtherLine />
//         <WrapperCursor onClick={googleSignIn}>
//           <FlexRowLayout gap="20px">
//             <Logo src="/svgs/btn_google_light_normal_ios.svg" />
//             <Font font="text200">Google 계정으로 로그인 하기</Font>
//           </FlexRowLayout>
//         </WrapperCursor>
//         <WrapperCursor onClick={githubSignIn}>
//           <FlexRowLayout gap="20px">
//             <Logo src="/img/GitHub-Mark-32px.png" />
//             <Font font="text200">Github 계정으로 로그인 하기</Font>
//           </FlexRowLayout>
//         </WrapperCursor>
//       </WrapperPad>
//     </>
//   );
// }
// export default Login;

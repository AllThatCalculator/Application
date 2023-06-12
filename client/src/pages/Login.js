import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { PageWhiteScreenBox } from "../components/organisms/common/PageScreenBox";
import { FlexBox, FlexColumnBox } from "../components/organisms/common/FlexBox";
import {
  BasicButton,
  CaptionButton,
} from "../components/organisms/common/Buttons";
import useSx from "../hooks/useSx";
import FindPwFormDialog from "../components/organisms/login/FindPwFormDialog";
import StyledImg from "../components/atoms/StyledImg";
import StyledPwTextField from "../components/organisms/common/StyledPwTextField";

/**
 * 로그인 페이지
 */
function Login({
  inputEmail,
  inputPw,
  inputEmailFindPw,

  isLoading,
  isOpenFindPwModal,
  setIsOpenFindPwModal,
  authError,
  errorType,
  onClickEmailSignInHandler,
  onClickGoogleSignInHandler,
  onClickGithubSignInHandler,
  onClickOpenFindPwModal,
  onClickFindPwHandler,
  signUpPage,
  idErrorEmail,
  idErrorPw,
  idEmailFindPw,

  setLoginInputs,
  idInputEmail,
  idInputPw,
  idInputEmailFindPw,
}) {
  const { widthSx } = useSx();

  // 소셜 로그인 버튼 리스트
  const socailLoginList = [
    {
      icon: (
        <StyledImg
          src={
            "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg"
          }
          width="24px"
          height="24px"
        />
      ),
      text: "Google 계정으로 로그인",
      onClick: onClickGoogleSignInHandler,
    },
    {
      icon: (
        <StyledImg src={"/svgs/github-mark.svg"} width="24px" height="24px" />
      ),
      text: "GitHub 계정으로 로그인",
      onClick: onClickGithubSignInHandler,
    },
  ];

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
                    id={idInputEmail}
                    required
                    fullWidth
                    label="이메일"
                    value={inputEmail}
                    onChange={setLoginInputs}
                    error={errorType === idErrorEmail}
                    helperText={errorType === idErrorEmail && authError}
                  />
                  <StyledPwTextField
                    id={idInputPw}
                    required={true}
                    label="비밀번호"
                    value={inputPw}
                    handleOnChange={setLoginInputs}
                    error={errorType === idErrorPw}
                    helperText={errorType === idErrorPw && authError}
                  />
                </FlexColumnBox>
                <CaptionButton
                  text="비밀번호 찾기"
                  onClick={onClickOpenFindPwModal}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!inputEmail || !inputPw}
                  onClick={onClickEmailSignInHandler}
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
        idInputEmailFindPw={idInputEmailFindPw}
        isOpen={isOpenFindPwModal}
        setIsOpen={setIsOpenFindPwModal}
        value={inputEmailFindPw}
        onChange={setLoginInputs}
        onClickFindPwHandler={onClickFindPwHandler}
        inputId={idEmailFindPw}
      />
    </>
  );
}

export default Login;

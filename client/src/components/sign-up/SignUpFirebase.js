import { BasicButton } from "../atom-components/Buttons";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { FlexColumnBox } from "../global-components/FlexBox";
import StyledPwTextField from "../global-components/StyledPwTextField";
import StyledImg from "../atom-components/StyledImg";

/**
 * 회원가입 페이지
 */
function SignUpFirebase({
  errorType,
  authError,

  inputEmail,
  inputPassword,
  inputPasswordConfirm,
  setSignUpInputs,
  keyErrorEmail,
  keyErrorPassword,
  keyErrorPasswordConfirm,
  idInputEmail,
  idInputPassword,
  idInputPasswordConfirm,
  onClickEmailSignUpHandler,
  onClickGoogleSignUpHandler,
  onClickGithubSignUpHandler,

  isSubmitDisabled,
}) {
  // 소셜 회원가입 버튼 리스트
  const socailSignUpList = [
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
      text: "Google 계정으로 회원가입",
      onClick: onClickGoogleSignUpHandler,
    },
    {
      icon: (
        <StyledImg src={"/svgs/github-mark.svg"} width="24px" height="24px" />
      ),
      text: "GitHub 계정으로 회원가입",
      onClick: onClickGithubSignUpHandler,
    },
  ];
  return (
    <>
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
                onChange={setSignUpInputs}
                error={errorType === keyErrorEmail}
                helperText={errorType === keyErrorEmail && authError}
              />
              <StyledPwTextField
                id={idInputPassword}
                required={true}
                label="비밀번호"
                value={inputPassword}
                handleOnChange={setSignUpInputs}
                error={errorType === keyErrorPassword}
                helperText={errorType === keyErrorPassword && authError}
              />
              <StyledPwTextField
                id={idInputPasswordConfirm}
                required={true}
                label="비밀번호 확인"
                value={inputPasswordConfirm}
                handleOnChange={setSignUpInputs}
                error={errorType === keyErrorPasswordConfirm}
                helperText={errorType === keyErrorPasswordConfirm && authError}
              />
            </FlexColumnBox>
            <Button
              type="submit"
              variant="contained"
              onClick={onClickEmailSignUpHandler}
              disabled={
                isSubmitDisabled ||
                !inputEmail ||
                !inputPassword ||
                !inputPasswordConfirm
              }
            >
              회원가입하기
            </Button>
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
          disabled={isSubmitDisabled}
        />
      ))}
    </>
  );
}

export default SignUpFirebase;

import { Grid } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import firebaseAuth from "../../../firebaseAuth";
import useError from "../../../hooks/useError";
import useSnackbar from "../../../hooks/useSnackbar";
import useSx from "../../../hooks/useSx";
import { ResponsiveButton } from "../common/Buttons";
import StyledPwTextField from "../common/StyledPwTextField";
import Title from "../common/Title";

function Password() {
  // id
  const KEY_CURRENT_PW = "currentPassword";
  const KEY_NEW_PW = "newPassword";
  const KEY_NEW_PW_CONFIRM = "newPasswordConfirm";

  const { isWindowMdDown } = useSx();

  // snackbar
  const { openSnackbar } = useSnackbar();

  // error state
  const { handleSetAuthError, handleSetErrorType, handleSetClearError } =
    useError();

  // redux state
  const { authError, errorType } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
  }));

  // 비밀번호 변경 : input 컴포넌트에 맞는 id변수들
  const [passwordInputs, setPasswordInputs] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const { currentPassword, newPassword, newPasswordConfirm } = passwordInputs;

  // 입력 event
  const handlePasswordInput = (event) => {
    const { id, value } = event.target;

    setPasswordInputs({
      ...passwordInputs, // 기존의 input 객체를 복사한 뒤
      [id]: value, // id 키를 가진 input만의 value로 설정
    });
  };

  const textFieldList = [
    {
      id: KEY_CURRENT_PW,
      label: "현재 비밀번호",
      value: currentPassword,
    },
    {
      id: KEY_NEW_PW,
      label: "새 비밀번호",
      value: newPassword,
    },
    {
      id: KEY_NEW_PW_CONFIRM,
      label: "새 비밀번호 확인",
      value: newPasswordConfirm,
    },
  ];

  /** 비밀번호 폼 제출 함수 */
  async function handleSubmit(event) {
    event.preventDefault();
    handleSetClearError();

    // 새 비밀번호 & 새 비밀번호 확인 비교
    if (newPassword !== newPasswordConfirm) {
      handleSetAuthError("invalid-password");
      handleSetErrorType(KEY_NEW_PW_CONFIRM);
      return;
    }

    // 보안이 민감하기 때문에 최근에 로그인해야 함. 아래와 같은 절차 진행
    // 01. 현재 사용자가 입력한 현재 비밀번호로부터 credential 발급
    const credential = firebaseAuth.getCredential(currentPassword);
    // 02. 발급받은 credential로 재로그인
    const request = firebaseAuth.signInWithCredential(credential);
    request.then((result) => {
      if (result === true) {
        // 03. 비밀번호 변경 요청
        handleUpdatePassword();
      } else {
        handleSetAuthError(result);
        switch (result) {
          // => 예외처리 ) 사용자가 입력한 현재 비밀번호가 틀림
          case "auth/wrong-password": {
            handleSetErrorType(KEY_CURRENT_PW);
            break;
          }
          default:
            break;
        }
      }
    });
  }

  // 03. 비밀번호 변경 요청
  async function handleUpdatePassword() {
    const request = firebaseAuth.updateNewPassword(newPassword);
    request.then((result) => {
      if (result === true) {
        // 04. 변경 성공 스낵바
        openSnackbar(
          "success",
          "변경되었습니다.",
          true,
          "top",
          "center",
          1600 // 지속시간
        );
        // init
        setPasswordInputs({
          currentPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        });
      } else {
        handleSetAuthError(result);
        switch (result) {
          // => 예외처리 ) 새로운 비밀번호 보안 취약
          case "auth/weak-password":
            handleSetErrorType(KEY_NEW_PW);
            break;
          default:
            break;
        }
      }
    });
  }

  return (
    <>
      <Title content="비밀번호 변경" />
      <Grid container gap="2rem">
        {textFieldList.map((item) => {
          const { id, label, value } = item;
          return (
            <Grid item xs={isWindowMdDown ? 12 : 8} key={id}>
              <StyledPwTextField
                id={id}
                label={label}
                value={value}
                handleOnChange={handlePasswordInput}
                error={errorType === id}
                helperText={errorType === id && authError}
              />
            </Grid>
          );
        })}
      </Grid>
      <ResponsiveButton
        size="large"
        variant="contained"
        onClick={handleSubmit}
        disabled={!currentPassword || !newPassword || !newPasswordConfirm}
      >
        변경 하기
      </ResponsiveButton>
    </>
  );
}
export default Password;

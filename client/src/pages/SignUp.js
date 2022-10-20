import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import { BtnIndigo } from "../components/atom-components/ButtonTemplate";
import {
  ContentLayout,
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import { OPTIONS_EMAIL_ADDRESS } from "../components/sign-up/constants";
import ActGuide from "../components/sign-up/ActGuide";
import WarningGuide from "../components/global-components/WarningGuide";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import EmailForm from "../components/sign-up/EmailForm";
import { Font } from "../components/atom-components/StyledText";
import OtherLine from "../components/sign-up/OtherLine";
import URL from "../components/PageUrls";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  signOut,
  deleteUser,
} from "firebase/auth";
import SignUpFirst from "../components/sign-up/SignUpFirst";
import SignUpSecond from "../components/sign-up/SignUpSecond";
import usePreventLeave from "../hooks/usePreventLeave";
import { useCallback } from "react";

/**
 * 흰색 뒷 배경
 */
const StyledWhite300 = styled(White300Layout)`
  position: fixed;
  top: 60px;
  bottom: 0;
  z-index: -1;
`;
/**
 * 회원가입 크기 530px
 * 윗부분에 패딩을 주기 위한 스타일 정의
 */
const WrapperPad = styled(ContentLayout)`
  flex-direction: column;
  width: 530px;
  padding: 50px 0px;
  gap: ${(props) => props.gap};
`;

/**
 * 회원가입 페이지
 */
function SignUp() {
  // 라우터 역할 네이게이션
  const navigate = useNavigate();

  // 나가는 거 확인하는 훅
  const preventLeave = usePreventLeave(asyncAwait);

  // 다음 스텝으로 넘어가는 거 확인하는 state
  const [checkInform, setCheckInform] = useState(false);

  function nextStep() {
    setCheckInform(true);
  }

  function exitStep() {
    setCheckInform(false);
  }

  async function deleteUserFirebase() {
    console.log("2");
    deleteUser(auth.currentUser)
      .then(() => {
        console.log("회원 계정 삭제");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function asyncAwait() {
    await deleteUserFirebase();
  }

  const onCheck = useCallback(() => {
    if (checkInform) {
      console.log("1");
      preventLeave.enablePrevent();
    } else {
      return preventLeave.disablePrevent();
    }
  }, [checkInform, preventLeave]);

  useEffect(onCheck, [onCheck]);

  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
        {!checkInform && <SignUpFirst nextStep={nextStep} />}
        {checkInform && <SignUpSecond exitStep={exitStep} />}
      </WrapperPad>
    </>
  );
}
export default SignUp;

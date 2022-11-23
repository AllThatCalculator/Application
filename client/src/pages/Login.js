import { useState, useEffect } from "react";
import styled from "styled-components";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import {
  BtnIndigo,
  BtnText,
} from "../components/atom-components/ButtonTemplate";
import WarningGuide from "../components/global-components/WarningGuide";
import {
  ContentLayout,
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import WriteInform from "../components/login/WriteInform";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import ActGuide from "../components/sign-up/ActGuide";
import URL from "../components/PageUrls";
import { Font } from "../components/atom-components/StyledText";
import OtherLine from "../components/sign-up/OtherLine";

import firebaseAuth from "../firebaseAuth";

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
 * 로그인 크기 346px
 * 윗부분에 패딩을 주기 위한 스타일 정의
 */
const WrapperPad = styled(ContentLayout)`
  flex-direction: column;
  width: 346px;
  padding: 50px 0px;
  gap: ${(props) => props.gap};
`;
/**
 * 로그인하기 버튼 양쪽으로 꽉 차게 스타일 정의
 */
const WrapperStretch = styled(FlexColumnLayout)`
  width: 100%;
`;
/**
 * 비밀번호 찾기 버튼 정렬 스타일 정의
 */
const WrapperFind = styled(FlexRowLayout)`
  justify-content: flex-end;
`;

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
 * 버튼 커서 스타일 정의
 */
const WrapperCursor = styled(BoxBorder)`
  cursor: pointer;
`;

/**
 * 로그인 페이지
 */
function Login() {
  const email = useInput("");
  const pw = useInput("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  // 입력 변경 사항 있을 시, 회원가입 후 경고 메세지 초기화
  useEffect(() => {
    setWarning("");
  }, [email.value, pw.value]);

  /**
   * 폼 제출
   * - 입력된 이메일과 비밀번호에 따른 경고 안내문 change & 로그인 통과
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    if (!email.value || !pw.value) {
      setWarning("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    // firebase 통한 이메일&패스워드 로그인
    const request = firebaseAuth.signInWithEmail(email.value, pw.value);
    request.then((result) => {
      if (result === true) {
        // 로그인 성공 시, 메인 화면으로
        navigate("/");
      } else {
        switch (result) {
          case "auth/user-not-found":
            setWarning("존재하지 않는 계정입니다.");
            break;
          case "auth/wrong-password":
            setWarning("잘못된 비밀번호입니다.");
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
    setWarning("");
    const request = firebaseAuth.signInWithSocial("google");
    request.then((result) => {
      if (result === true) {
        // 로그인 성공 시, 메인 화면으로
        navigate("/");
      } else if (result === false) {
        setWarning("존재하지 않는 계정입니다.");
      } else {
        switch (result) {
          case "auth/account-exists-with-different-credential":
            setWarning("다른 인증 방식으로 존재하는 계정입니다.");
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
    setWarning("");
    const request = firebaseAuth.signInWithSocial("github");
    request.then((result) => {
      if (result === true) {
        // 로그인 성공 시, 메인 화면으로
        navigate("/");
      } else if (result === false) {
        setWarning("존재하지 않는 계정입니다.");
      } else {
        switch (result) {
          case "auth/account-exists-with-different-credential":
            setWarning("다른 인증 방식으로 존재하는 계정입니다.");
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
  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
        <form onSubmit={onSubmitHandler}>
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
        </form>
        <OtherLine />
        <WrapperCursor onClick={googleSignIn}>
          <FlexRowLayout gap="20px">
            <Logo src="/svgs/btn_google_light_normal_ios.svg" />
            <Font font="text200">Google 계정으로 로그인 하기</Font>
          </FlexRowLayout>
        </WrapperCursor>
        <WrapperCursor onClick={githubSignIn}>
          <FlexRowLayout gap="20px">
            <Logo src="/img/GitHub-Mark-32px.png" />
            <Font font="text200">Github 계정으로 로그인 하기</Font>
          </FlexRowLayout>
        </WrapperCursor>
      </WrapperPad>
    </>
  );
}
export default Login;

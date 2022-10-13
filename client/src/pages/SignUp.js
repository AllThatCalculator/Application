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
} from "firebase/auth";

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
 * 양쪽으로 꽉 차게 스타일 정의
 */
const WrapperStretch = styled(FlexColumnLayout)`
  width: 100%;
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
 * 회원가입 페이지
 */
function SignUp() {
  /**
   * 이메일 email -> address, writtenDomain, selectedDomain
   * 비밀번호 pw
   * 비밀번호 확인 pwConfirmation
   */
  const address = useInput("");
  const [domain, setDomain] = useState("");
  const [writtenDomain, setwrittenDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

  const pw = useInput("");
  const pwConfirmation = useInput("");

  // 주의 문구 여부 : 비밀번호 & 비밀번호 확인 비교
  const [warningPw, setWarningPw] = useState("");

  // 주의 문구 여부 : 다 입력되었는지 여부 & 요청 정보 오류
  const [warningAll, setWarningAll] = useState("");

  // 주의 문구 여부 : 가입하기 버튼 클릭 후 (이미 존재 계정, 비밀번호 유효성, 이메일 형식)
  const [warningSignUp, setWarningSignUp] = useState("");

  // 라우터 역할 네이게이션
  const navigate = useNavigate();

  // 바로 초기화하면 defaultValue로 설정해서인지 값이 안 바뀌어서 나중에 set하기 위해 useEffect 사용
  useEffect(() => setSelectedDomain("직접 입력"), []);

  // 선택되거나 입력된 도메인 갱신
  useEffect(() => setDomain(writtenDomain), [writtenDomain]);

  // 비밀번호 & 비밀번호 확인 같은지 검사
  useEffect(() => {
    if (pw.value !== pwConfirmation.value) {
      setWarningPw("비밀번호가 일치하지 않습니다.");
    } else setWarningPw("");
  }, [pw.value, pwConfirmation.value]);

  // 입력 변경 사항 있을 시, 회원가입 후 경고 메세지 & 모든 사항 입력 경고 메세지 초기화
  useEffect(() => {
    setWarningAll("");
    setWarningSignUp("");
  }, [address.value, domain, pw.value, pwConfirmation.value]);

  /**
   * 저작자 이메일의 도메인 부분 change 함수 (select 박스)
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeSelectedDomain(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_EMAIL_ADDRESS.filter((x) => x.value === targetValue);
    const domainValue = option[0].name;
    if (domainValue === "직접 입력") {
      setwrittenDomain("");
    } else {
      setwrittenDomain(domainValue);
    }
    setSelectedDomain(domainValue);
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
    if (!address.value || !domain || !pw.value || !pwConfirmation.value) {
      setWarningAll("모든 사항을 입력해 주세요.");
      return;
    } else setWarningAll("");

    // firebase 통한 이메일 회원가입 진행
    const email = address.value + "@" + domain;
    createUserWithEmailAndPassword(auth, email, pw.value)
      .then((userCredential) => {
        // 성공 시, 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        navigate(URL.WRITE_USER_INFO);
      })
      .catch((error) => {
        switch (error.code) {
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
      });
  }

  /**
   * firebase google 회원가입
   */
  function googleSignUp(event) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        // 성공 시, 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        navigate(URL.WRITE_USER_INFO);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  /**
   * firebase github 회원가입
   */
  function githubSignUp(event) {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // ...
        // 성공 시, 정보 입력해야 하므로 정보 입력 페이지로 넘어감
        navigate(URL.WRITE_USER_INFO);
      })
      .catch((error) => {
        // Handle Errors here.
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            console.log("이미 존재하는 계정");
            break;
          default:
            break;
        }
      });
  }

  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
        <form onSubmit={onSubmitHandler}>
          <BoxBorder gap="20px">
            <BoxTitle content="회원가입" />
            <WrapperStretch gap="10px">
              <EmailForm
                address={address.value}
                writtenDomain={writtenDomain}
                selectedDomain={selectedDomain}
                pw={pw.value}
                pwConfirmation={pwConfirmation.value}
                changeAddress={address.onChange}
                changeDomain={(event) => setwrittenDomain(event.target.value)}
                changeSelectedDomain={changeSelectedDomain}
                changePw={pw.onChange}
                changePwConfirmation={pwConfirmation.onChange}
              />
              {warningPw && <WarningGuide content={warningPw} />}
              {warningAll && <WarningGuide content={warningAll} />}
              {warningSignUp && <WarningGuide content={warningSignUp} />}
            </WrapperStretch>
            <WrapperStretch>
              <BtnIndigo text="가입하기" onClick={onSubmitHandler} />
            </WrapperStretch>
            <ActGuide
              guide="이미 계정이 있으신가요?"
              lead="로그인하기"
              onClick={() => navigate("/login")}
            />
          </BoxBorder>
        </form>
        <OtherLine />
        <WrapperCursor onClick={googleSignUp}>
          <FlexRowLayout gap="20px">
            <Logo src="/img/googleLogo.png" />
            <Font font="text200">Google 계정으로 가입 하기</Font>
          </FlexRowLayout>
        </WrapperCursor>
        <WrapperCursor onClick={githubSignUp}>
          <FlexRowLayout gap="20px">
            <Logo src="/img/githubLogo.png" />
            <Font font="text200">Github 계정으로 가입 하기</Font>
          </FlexRowLayout>
        </WrapperCursor>
      </WrapperPad>
    </>
  );
}
export default SignUp;

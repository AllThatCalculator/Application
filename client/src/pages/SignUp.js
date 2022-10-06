import { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../components/styles";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import {
  BtnIndigo,
  StyledIcon,
} from "../components/atom-components/ButtonTemplate";
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
import SmallTitle from "../components/global-components/SmallTitle";

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

const Title = styled.div`
  ${styles.sytleText.text200};
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
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

  // 주의 문구 여부 : 비밀번호 유효성 검사 / 비밀번호 & 비밀번호 확인 비교
  const [warningPw, setWarningPw] = useState("");

  // 주의 문구 여부: 다 입력되었는지 여부 & 요청 정보 오류
  const [warningAll, setWarningAll] = useState("");

  // 라우터 역할 네이게이션
  const navigate = useNavigate();

  // 바로 초기화하면 defaultValue로 설정해서인지 값이 안 바뀌어서 나중에 set하기 위해 useEffect 사용
  useEffect(() => setSelectedDomain("직접 입력"), []);

  // 선택되거나 입력된 도메인 갱신
  useEffect(() => setDomain(writtenDomain), [writtenDomain]);

  // 비밀번호 유효성 검사 (10자 이상, 알파벳과 특수문자 포함)
  // 비밀번호 & 비밀번호 확인 같은지 검사
  useEffect(() => {
    // 비밀번호 최소 10자, 하나의 문자, 하나의 숫자, 하나의 특수 문자 정규식
    const specialLetter =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/g;
    if (!specialLetter.test(pw.value)) {
      if (pw.value.length > 0) {
        setWarningPw(
          "최소 10자 이상, 숫자와 알파벳과 특수문자를 포함해 주세요."
        );
        return;
      } else setWarningPw("");
    }
    if (pw.value !== pwConfirmation.value) {
      setWarningPw("비밀번호가 일치하지 않습니다.");
    } else setWarningPw("");
  }, [pw.value, pwConfirmation.value]);

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
  }
  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
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
        <BoxBorder>
          <FlexRowLayout gap="20px">
            <Logo src="/img/googleLogo.png" />
            <Title>Google 계정으로 가입 하기</Title>
          </FlexRowLayout>
        </BoxBorder>
        <BoxBorder>
          <FlexRowLayout gap="20px">
            <Logo src="/img/githubLogo.png" />
            <Title>Github 계정으로 가입 하기</Title>
          </FlexRowLayout>
        </BoxBorder>
      </WrapperPad>
    </>
  );
}
export default SignUp;

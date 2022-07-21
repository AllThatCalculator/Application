import { useState } from "react";
import styled from "styled-components";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import {
  BtnIndigo,
  BtnText,
} from "../components/atom-components/ButtonTemplate";
import SmallTitle from "../components/global-component/SmallTitle";
import WarningGuide from "../components/global-component/WarningGuide";
import {
  ContentLayout,
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import { ACCOUNT } from "../components/login/Account";
import WriteInform from "../components/login/WriteInform";
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
 * 사용자가 특정 수행을 할 수 있도록 안내하는 컴포넌트
 *
 * @param {string, string} param0
 * guide : 특정 수행 내용을 안내
 * lead : 사용자가 할 특정 수행 내용
 */
function ActGuide({ guide, lead }) {
  return (
    <FlexRowLayout gap="5px">
      <SmallTitle content={guide} />
      <BtnText text={lead} />
    </FlexRowLayout>
  );
}
/**
 * 로그인 페이지
 */
function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [warning, setWarning] = useState("");
  /**
   * 이메일 change 함수
   * @param {*} event
   */
  function changeEmail(event) {
    setEmail(event.target.value);
  }
  /**
   * 비밀번호 change 함수
   * @param {*} event
   */
  function changePw(event) {
    setPw(event.target.value);
  }
  /**
   * 입력된 이메일과 비밀번호에 따른 경고 안내문 change & 로그인 통과
   */
  function onClickLogin() {
    if (!email || !pw) {
      setWarning("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    let flag = false;
    for (let i = 0; i < ACCOUNT.length; i++) {
      if (ACCOUNT[i].user_email === email) {
        flag = true;
        if (ACCOUNT[i].pw !== pw) {
          setWarning("잘못된 비밀번호입니다.");
          return;
        } else {
          console.log(email + " " + pw + "로그인 되었습니다.");
        }
      }
    }
    if (!flag) setWarning("계정을 찾을 수 없습니다.");
  }

  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
        <BoxBorder gap="20px">
          <BoxTitle content="로그인" />
          <WrapperStretch gap="10px">
            <WriteInform
              email={email}
              pw={pw}
              changeEmail={changeEmail}
              changePw={changePw}
            />
            {warning && <WarningGuide content={warning} />}
            <WrapperFind>
              <BtnText text="비밀번호 찾기" />
            </WrapperFind>
          </WrapperStretch>
          <WrapperStretch>
            <BtnIndigo text="로그인하기" onClick={onClickLogin} />
          </WrapperStretch>
        </BoxBorder>
        <BoxBorder>
          <ActGuide guide="계정이 없으신가요?" lead="회원가입하기" />
        </BoxBorder>
      </WrapperPad>
    </>
  );
}
export default Login;

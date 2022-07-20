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
import {
  ContentLayout,
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import WriteInform from "../components/login.js/WriteInform";
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
 * 회원가입하기 안내문
 */
function Guide({ guide, lead }) {
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
  const [password, setPassword] = useState("");
  /**
   * 이메일 change 함수
   * @param {*} event
   */
  function changeEmail(event) {
    setEmail(event.target.value);
  }
  /**
   * 비밀번호 change 함수
   * -> 입력한 만큼 *로 표시
   * @param {*} event
   */
  function changePassword(event) {
    setPassword(event.target.value);
  }
  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
        <BoxBorder gap="20px">
          <BoxTitle content="로그인" />
          <WrapperStretch gap="5px">
            <WriteInform
              email={email}
              password={password}
              changeEmail={changeEmail}
              changePassword={changePassword}
            />
            <WrapperFind>
              <BtnText text="비밀번호 찾기" />
            </WrapperFind>
          </WrapperStretch>
          <WrapperStretch>
            <BtnIndigo text="로그인하기" />
          </WrapperStretch>
        </BoxBorder>
        <BoxBorder>
          <Guide guide="계정이 없으신가요?" lead="회원가입하기" />
        </BoxBorder>
      </WrapperPad>
    </>
  );
}
export default Login;

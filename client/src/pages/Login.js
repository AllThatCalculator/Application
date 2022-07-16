import { useState } from "react";
import styled from "styled-components";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import {
  BtnIndigo,
  BtnText,
} from "../components/atom-components/ButtonTemplate";
import { ExplanationInputBox } from "../components/global-component/Explanation";
import SmallTitle from "../components/global-component/SmallTitle";
import {
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import { InformBox } from "../components/register/WriteInform";

/**
 * 흰색 뒷 배경
 */
const StyledWhite300Layout = styled(White300Layout)`
  position: absolute;
  top: 60px;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

/**
 * 경계선 있는 박스 내용물을 가운데 정렬
 */
const BoxBorderCenter = styled(BoxBorder)`
  text-align: center;
`;
/**
 * 로그인 크기 346px
 * 윗부분에 패딩을 주기 위한 스타일 정의
 */
const WrapperPad = styled(FlexColumnLayout)`
  width: 346px;
  padding-top: 50px;
`;
/**
 * 비밀번호 찾기 정렬 스타일 정의
 */
const WrapperFind = styled(FlexRowLayout)`
  justify-content: flex-end;
`;
/**
 * 가운데 정렬 스타일 정의
 */
const WrapperCenter = styled(FlexRowLayout)`
  justify-content: center;
`;
/**
 * 이메일, 비밀번호와 비밀번호 찾기 반환
 *
 * @param {string, string, funtion, funtion} param0
 * email: 입력된 이메일
 * password : 입력된 비밀번호
 * changeEmail : 이메일 입력 이벤트
 * changePassword : 비밀번호 입력 이벤트
 */
function Inform({ email, password, changeEmail, changePassword }) {
  return (
    <>
      <BoxTitle content="로그인" />
      <FlexColumnLayout gap="5px">
        <InformBox>
          <ExplanationInputBox
            isLine={true}
            ratioLeft="1"
            ratioRight="11"
            icon="PersonFill"
            iconColor="blue900"
            placeholder="이메일"
            defaultValue={email}
            onChange={changeEmail}
          />
          <ExplanationInputBox
            secureTextEntry={true}
            isLine={false}
            ratioLeft="1"
            ratioRight="11"
            icon="LockFill"
            iconColor="blue900"
            placeholder="비밀번호"
            defaultValue={password}
            onChange={changePassword}
          />
        </InformBox>
        <WrapperFind>
          <BtnText text="비밀번호 찾기" />
        </WrapperFind>
      </FlexColumnLayout>
      <BtnIndigo text="로그인하기" />
    </>
  );
}
/**
 * 회원가입하기 안내문
 */
function SignUp() {
  return (
    <WrapperCenter gap="5px">
      <SmallTitle content="계정이 없으신가요?" />
      <BtnText text="회원가입하기" />
    </WrapperCenter>
  );
}

/**
 * 경계선 있는 박스에 감싸서 반환
 * @param {string, funtion} param0
 * gap : 갭
 * content : 감쌀 컴포넌트
 */
function BoxBorderContent({ gap, content }) {
  return <BoxBorderCenter gap={gap}>{content}</BoxBorderCenter>;
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
    <StyledWhite300Layout>
      <WrapperPad gap="20px">
        <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
        <BoxBorderContent
          gap="20px"
          content={
            <Inform
              email={email}
              changeEmail={changeEmail}
              password={password}
              changePassword={changePassword}
              // 비밀번호 찾기 onClick
              // 로그인하기 onClick
            />
          }
        />
        <BoxBorderContent content={<SignUp />} />
      </WrapperPad>
    </StyledWhite300Layout>
  );
}
export default Login;

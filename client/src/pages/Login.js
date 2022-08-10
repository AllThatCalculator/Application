import { useState } from "react";
import styled from "styled-components";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import {
  BtnIndigo,
  BtnText,
} from "../components/atom-components/ButtonTemplate";
import WarningGuide from "../components/global-component/WarningGuide";
import {
  ContentLayout,
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import WriteInform from "../components/login/WriteInform";
import useInput from "../user-hooks/UseInput";
import loginUser from "../components/user-actions/LoginUser";
import { useNavigate } from "react-router-dom";
import ActGuide from "../components/sign-up/ActGuide";
import URL from "../components/PageUrls";
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
 * 로그인 페이지
 */
function Login() {
  const email = useInput("");
  const pw = useInput("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

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
    // 서버에 보낼 정보 => body
    let body = {
      email: email.value,
      pw: pw.value,
    };
    // 서버에 요청
    const request = loginUser(body);
    request.then((res) => {
      // 로그인 실패
      if (!res.success) setWarning(res.message);
      // 로그인 성공
      else {
        window.location.replace(URL.CALCULET);
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
          </BoxBorder>
        </form>
        <BoxBorder>
          <ActGuide
            guide="계정이 없으신가요?"
            lead="회원가입하기"
            onClick={() => navigate(URL.SIGN_UP)}
          />
        </BoxBorder>
      </WrapperPad>
    </>
  );
}
export default Login;

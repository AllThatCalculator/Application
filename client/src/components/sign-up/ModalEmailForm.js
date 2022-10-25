import { Font } from "../atom-components/StyledText";
import styled from "styled-components";
import { FlexColumnLayout } from "../Layout";
import EmailForm from "./EmailForm";

// 임시 디자인
const Wrapper = styled(FlexColumnLayout)`
  background: #ffffff;
  padding: 20px;
  gap: 20px;
`;

function ModalEmailForm() {
  return (
    <Wrapper>
      <Font font="text100">
        동일한 메일로 계정이 이미 존재합니다. <br></br> 계정 연동을 원하시면
        아래 이메일과 비밀번호를 입력해주세요.
      </Font>
      <EmailForm />
    </Wrapper>
  );
}

export default ModalEmailForm;

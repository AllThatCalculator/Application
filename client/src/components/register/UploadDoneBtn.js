import styled from "styled-components";
import { BtnBlue } from "../atom-components/ButtonTemplate";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
`;

function UploadDoneBtn() {
  return (
    <Wrapper>
      <BtnBlue text="계산기 등록" icon="Upload" />
    </Wrapper>
  );
}

export default UploadDoneBtn;

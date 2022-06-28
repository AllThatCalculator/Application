import styled from "styled-components";
import { BtnBlue } from "../atom-components/ButtonTemplate";

// 가장 바깥 스타일 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
`;

/**
 * 계산기 저작 등록 완료 버튼 컴포넌트
 * (임시) 등록 완료하면 console에 등록한 계산기 정보들 찍히도록
 * @param {*} props
 * props: DB로 넘겨야 하는 계산기 관련 정보들
 */
function UploadDoneBtn(props) {
  /**
   * (임시) console에 정보 찍는 함수
   */
  function onClick() {
    console.log(props);
  }

  return (
    <Wrapper>
      <BtnBlue text="계산기 등록" icon="Upload" onClick={onClick} />
    </Wrapper>
  );
}

export default UploadDoneBtn;

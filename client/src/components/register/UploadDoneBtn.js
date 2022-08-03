import axios from "axios";
import styled from "styled-components";
import { BtnBlue } from "../atom-components/ButtonTemplate";
import { FlexColumnLayout } from "../Layout";
import { useNavigate } from "react-router-dom";

/**
 * 가장 바깥 스타일 정의
 */
const Wrapper = styled(FlexColumnLayout)`
  align-items: flex-end;
`;

/**
 * 계산기 저작 등록 완료 버튼 컴포넌트
 * (임시) 등록 완료하면 console에 등록한 계산기 정보들 찍히도록
 * @param {*} props
 * props: DB로 넘겨야 하는 계산기 관련 정보들
 */
function UploadDoneBtn(props) {
  const navigate = useNavigate();

  async function registerCalculet() {
    try {
      await axios.post("/calculets/", props).then((response) => {
        // 안내 팝업창
        navigate("/");
      });
    } catch (error) {
      // 실패 팝업 처리
    }
  }

  return (
    <Wrapper>
      <BtnBlue text="계산기 등록" icon="Upload" onClick={registerCalculet} />
    </Wrapper>
  );
}

export default UploadDoneBtn;

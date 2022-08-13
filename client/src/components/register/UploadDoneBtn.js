import axios from "axios";
import styled from "styled-components";
import { BtnBlue } from "../atom-components/ButtonTemplate";
import { FlexColumnLayout } from "../Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WarningGuide from "../global-component/WarningGuide";

/**
 * 가장 바깥 스타일 정의
 */
const Wrapper = styled(FlexColumnLayout)`
  gap: 10px; // 임시
  align-items: flex-end;
`;

/**
 * 계산기 저작 등록 완료 버튼 컴포넌트
 * @param {*} props
 * props: DB로 넘겨야 하는 계산기 관련 정보들
 */
function UploadDoneBtn(props) {
  const navigate = useNavigate();

  const [warningMsg, setWarningMsg] = useState(null);

  function checkBeforeUpload() {
    if (!props.title || !props.description || !props.categoryMainId) {
      setWarningMsg("모든 사항을 입력해주세요.");
      return false;
    } else {
      return true;
    }
  }

  async function registerCalculet() {
    if (checkBeforeUpload()) {
      try {
        await axios.post("/api/calculets/", props).then((response) => {
          // 안내 팝업창
          navigate("/");
        });
      } catch (error) {
        // 실패 팝업 처리
      }
    }
  }

  return (
    <Wrapper>
      {warningMsg && <WarningGuide content={warningMsg} />}
      <BtnBlue text="계산기 등록" icon="Upload" onClick={registerCalculet} />
    </Wrapper>
  );
}

export default UploadDoneBtn;

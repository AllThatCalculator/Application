import styled from "styled-components";
import { BtnBlue } from "../atom-components/ButtonTemplate";
import { FlexColumnLayout } from "../Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WarningGuide from "../global-components/WarningGuide";
import registerCalculetTemp from "../../user-actions/registerCalculetTemp";
import URL from "../PageUrls";

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
    if (
      !props.title ||
      !props.description ||
      props.categoryMainId === null ||
      props.categorySubId === null
    ) {
      setWarningMsg("모든 사항을 입력해주세요.");
      return false;
    } else {
      return true;
    }
  }

  function registerCalculet() {
    if (checkBeforeUpload()) {
      const request = registerCalculetTemp(props);
      request.then((res) => {
        if (res) {
          // 안내 팝업창
          navigate(URL.CALCULET);
        } else {
          // 실패 팝업 처리
        }
      });
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

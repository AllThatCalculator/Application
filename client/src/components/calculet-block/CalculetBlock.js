import styled from "styled-components";
import useCalculetRecord from "../../hooks/useCalculetRecord";
import { setCalculetInOutputObj } from "../../utils/setCalculetInOutputObj";
import CalculetManual from "./CalculetManual";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

/**
 *
 * @param {string} srcCode - 계산기 소스코드
 * @param {string} manual - 계산기 설명 마크다운
 * @param {string} calculetId - 계산기 번호
 * @param {bool} isPreview - 미리보기인지
 */
function CalculetBlock({ srcCode, manual, calculetId, isPreview = false }) {
  // console.log(srcCode);
  const { handleSetCalculetObj, handleGetCalculetRecords } =
    useCalculetRecord();
  /**
   * 받아온 html을 넣는 iframe의 크기를 원본 html 크기 맞게 조절하는 함수
   * @param {event object} e
   */
  function adjustHeight(e) {
    const frame = e.target;
    frame.style.width = "100%";
    frame.style.height = `${frame.contentDocument.body.scrollHeight}px`;

    // get input&output object and record list
    setCalculetInOutputObj(calculetId, handleSetCalculetObj);
    // 미리보기면 return
    if (!isPreview) {
      handleGetCalculetRecords(calculetId);
    }
  }
  // console.log(srcCode);
  return (
    <Wrapper>
      <iframe
        srcDoc={
          `<link href="/static-files/css/calculet.css" rel="stylesheet">
          <style>
          * {
            padding: 0px;
            margin: 0px;
          }
          </style>
          ` + srcCode
        }
        style={{ width: "100%", border: "none", overflow: "auto" }}
        onLoad={(e) => adjustHeight(e)}
        scrolling="no"
        title="calculet"
      />
      <CalculetManual
        content={manual}
        calculetId={calculetId}
        isPreview={isPreview}
      />
    </Wrapper>
  );
}
export default CalculetBlock;

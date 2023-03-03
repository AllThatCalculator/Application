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
 * @returns
 */
function CalculetBlock({ srcCode, manual, calculetId }) {
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
    handleGetCalculetRecords(calculetId);
  }

  return (
    <Wrapper>
      <iframe
        srcDoc={
          `<link href="/file/css/calculet.css" rel="stylesheet">` + srcCode
        }
        style={{ width: "100%", border: "none", overflow: "auto" }}
        onLoad={(e) => adjustHeight(e)}
        scrolling="no"
        title="calculet"
      />
      <CalculetManual content={manual} calculetId={calculetId} />
    </Wrapper>
  );
}
export default CalculetBlock;

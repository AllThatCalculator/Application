import styled from "styled-components";
import CalculetManual from "./CalculetManual";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/**
 *
 * @param {string} srcCode - 계산기 소스코드
 * @param {string} manual - 계산기 설명 마크다운
 * @returns
 */
function CalculetBlock({ srcCode, manual }) {
  /**
   * 받아온 html을 넣는 iframe의 크기를 원본 html 크기 맞게 조절하는 함수
   * @param {event object} e
   */
  function adjustHeight(e) {
    const frame = e.target;
    frame.style.width = "100%";
    frame.style.height = `${frame.contentDocument.body.scrollHeight}px`;
  }

  return (
    <Wrapper>
      <iframe
        srcDoc={srcCode}
        style={{ width: "100%", border: "none", overflow: "auto" }}
        onLoad={(e) => adjustHeight(e)}
        scrolling="no"
      />
      <CalculetManual content={manual} />
    </Wrapper>
  );
}
export default CalculetBlock;

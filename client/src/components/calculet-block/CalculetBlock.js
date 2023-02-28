import styled from "styled-components";
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
  /**
   * 받아온 html을 넣는 iframe의 크기를 원본 html 크기 맞게 조절하는 함수
   * @param {event object} e
   */
  function adjustHeight(e) {
    const frame = e.target;
    frame.style.width = "100%";
    frame.style.height = `${frame.contentDocument.body.scrollHeight}px`;

    // 계산 내역
    const outputs =
      window.frames[0].document.querySelectorAll(`.atc-calculet-output`);
    // console.log(outputs);
    outputs.forEach((output) => {
      output.oninput = (event) => {
        // input.oninput() 덮어씌워지는 것을 방지하기 위해, 기존 oninput 실행
        // console.log(`Input value changed: ${event.target.value}`);
      };
    });
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

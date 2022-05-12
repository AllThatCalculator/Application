import CalculetHeader from "./CalculetHeader";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CalculetManual from "./CalculetManual";

// (임시) html 파일 string으로 읽어오기 위해 사용
// -> 백엔드 연결 이후에는 page/calculet.js에서 http request로 받아서 props로 받아 calculetObj에 넣어서 전달
// eslint-disable-next-line
import srcCode from "raw-loader!../../calculets/arithmeticOperation/arithmeticOperation.html";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

/**
 * (임시) 마크다운 파일 string으로 읽어오는 함수
 * @param {state function} update
 */
async function loadCalculetManual(update) {
  fetch(require("../../calculets/arithmeticOperation/arithmeticOperation.md"))
    .then((res) => res.text())
    .then((textData) => update(textData));
}

/**
 * 계산기 본문 + 설명을 포함하는 컴포넌트
 * @param {object} calculetObj 계산기 객체
 *        {string} name: "사칙연산 계산기", - 계산기 이름
          {integer} id: 1,                 - 계산기 id
          {string} srcCode: null,          - 계산기 소스코드
          {string} contributor: "bsa0322", - 계산기 저작자
          {string} manual: null,           - 계산기 설명 마크다운
          {string} description: "사칙연산 계산기입니다.", - 계산기 한줄 설명
          {object}  statistics: {
                    {integer} bookmarkCnt: 10,  - 북마크 수
                    {integer} likeCnt: 5,       - 좋아요 수
                    {integer} reportCnt: 1,     - 신고 수
                    {integer} viewCnt: 100,     - 조회수
                    {integer} calculationCnt: 10, - 연산수
                    {integer} userCnt: 10,      - 사용자 수
                  },
 */
function CalculetBlock({ calculetObj }) {
  const [code, setCode] = useState("");
  const [manual, setManual] = useState("");

  // (임시) 코드 불러오는 부분
  useEffect(() => {
    setCode(code);
    loadCalculetManual(setManual);
  }, []);

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
      <CalculetHeader
        name={calculetObj.name}
        contributor={calculetObj.contributor}
        statistics={calculetObj.statistics}
      />
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

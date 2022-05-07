import CalculetHeader from "./CalculetHeader";
import ButtonGray from "../atom-components/ButtonGray";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

// eslint-disable-next-line
import srcCode from "raw-loader!../../calculets/arithmeticOperation.html";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

function CalculetManual({ content }) {
  const [toggle, setToggle] = useState(false); //토글 처음엔 닫혀있음
  const onFlip = () => {
    setToggle((current) => !current);
  };
  return (
    <>
      <ButtonGray text="자세히" toggle={toggle} onClick={onFlip} />
      {toggle && <ReactMarkdown children={content} toggle={toggle} />}
    </>
  );
}

async function loadCalculetManual(path, update) {
  fetch(require("../../calculets/arithmeticOperation.md"))
    .then((res) => res.text())
    .then((textData) => update(textData));
}

function CalculetBlock() {
  const [calculetObj, setCalculetObj] = useState({
    name: "사칙연산 계산기",
    id: 1,
    srcCode: null,
    contributor: "bas0322",
    manual: null,
    description: "사칙연산 계산기입니다.",
    statistics: {
      bookmarkCnt: 10,
      likeCnt: 10,
      reportCnt: 10,
      viewCnt: 10,
      calculationCnt: 10,
      userCnt: 10,
    },
  });
  const [calculetCode, setCalculetCode] = useState(srcCode);
  const [calculetManual, setCalculetManual] = useState(null);

  useEffect(() => {
    loadCalculetManual(
      "../../calculets/arithmeticOperation.md",
      setCalculetManual
    );
  }, []);

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
        srcDoc={calculetCode}
        style={{ width: "100%", border: "none", overflow: "auto" }}
        onLoad={(e) => adjustHeight(e)}
      />
      <CalculetManual content={calculetManual} />
    </Wrapper>
  );
}
export default CalculetBlock;
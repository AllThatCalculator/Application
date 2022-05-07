import CalculetHeader from "./CalculetHeader";
import ButtonGray from "../atom-components/ButtonGray";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

// eslint-disable-next-line
import srcCode from "raw-loader!../../calculets/arithmeticOperation/arithmeticOperation.html";
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
      <div>
        <ButtonGray text="자세히" toggle={toggle} onClick={onFlip} />
      </div>
      {toggle && <ReactMarkdown children={content} toggle={toggle} />}
    </>
  );
}

async function loadCalculetManual(path, update) {
  fetch(require("../../calculets/arithmeticOperation/arithmeticOperation.md"))
    .then((res) => res.text())
    .then((textData) => update(textData));
}

function CalculetBlock({ calculetObj }) {
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
        scrolling="no"
      />
      <CalculetManual content={calculetManual} />
    </Wrapper>
  );
}
export default CalculetBlock;

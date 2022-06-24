import styled from "styled-components";
import styles from "../styles";
import { useState, useRef } from "react";
import CalculetBlock from "../calculet-block/CalculetBlock";
import Editor from "@monaco-editor/react";
import { StyledIcon } from "../atom-components/ButtonTemplate";

// 스타일드 탭
const StyledTab = styled.div`
  display: flex;
  flex-direction: row;
  background: ${styles.styleColor.white300};
  padding: 0px;
  gap: ${styles.styleLayout.basic200};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

// 스타일드 기본 탭 버튼 배경
const StyledBg = styled.div`
  align-items: center;
  padding: ${styles.styleLayout.basic200};
  background: ${styles.styleColor.white300};
  ${styles.sytleText.text100};
  color: black;

  cursor: pointer;
`;

// 스타일드 기본 탭 버튼 클릭됨
const StyledBgClicked = styled.div`
  align-items: center;
  padding: ${styles.styleLayout.basic200};
  background: ${styles.styleColor.white300};
  ${styles.sytleText.buttonWhite};
  color: black;
  border-bottom: 4px solid ${styles.styleColor.green100};

  cursor: pointer;
`;

// 스타일드 기본 탭 버튼
const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${styles.styleColor.white300};
  padding: ${styles.styleLayout.basic50};
  gap: ${styles.styleLayout.basic200};
  border-radius: 7px;
  &:hover {
    background: ${styles.styleColor.green25a};
  }
`;

function ButtonTab({ text, icon, isValid, onClick }) {
  return (
    <>
      {" "}
      {!isValid ? (
        <StyledBg id={text} onClick={onClick}>
          <StyledButton id={text}>
            {icon && <StyledIcon id={text} name={icon}></StyledIcon>}
            <div id={text}>{text}</div>
          </StyledButton>
        </StyledBg>
      ) : (
        <StyledBgClicked id={text} onClick={onClick}>
          <StyledButton id={text}>
            {icon && <StyledIcon id={text} name={icon}></StyledIcon>}
            <div id={text}>{text}</div>
          </StyledButton>
        </StyledBgClicked>
      )}{" "}
    </>
  );
}

function TabMenu() {
  const [code, setCode] = useState(true);
  const [md, setMd] = useState(false);
  const [eye, setEye] = useState(false);

  const editorRef = useRef(null);

  const [htmlScript, setHtmlScript] = useState("<!DOCTYPE html>");
  const [markdown, setMarkdown] = useState("### wirte detail!");

  function onClickButtonTab(event) {
    if (event.target.id === "HTML") {
      setCode(true);
      setMd(false);
      setEye(false);
    } else if (event.target.id === "MARKDOWN") {
      setCode(false);
      setMd(true);
      setEye(false);
    } else {
      setCode(false);
      setMd(false);
      setEye(true);
    }
  }

  return (
    <>
      <StyledTab>
        <ButtonTab
          text="HTML"
          icon="Code"
          isValid={code}
          onClick={onClickButtonTab}
        />
        <ButtonTab
          text="MARKDOWN"
          icon="MarkDown"
          isValid={md}
          onClick={onClickButtonTab}
        />
        <ButtonTab
          text="미리 보기"
          icon="Eye"
          isValid={eye}
          onClick={onClickButtonTab}
        />
      </StyledTab>
      <>
        {code ? (
          <Editor
            height="63vh"
            theme="vs-dark"
            defaultLanguage="html"
            defaultValue={htmlScript}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            onChange={() => {
              setHtmlScript(editorRef.current.getValue());
            }}
          />
        ) : (
          <></>
        )}
        {md ? (
          <Editor
            height="63vh"
            theme="vs-dark"
            defaultLanguage="markdown"
            defaultValue={markdown}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            onChange={() => {
              setMarkdown(editorRef.current.getValue());
            }}
          />
        ) : (
          <></>
        )}
        {eye ? (
          <CalculetBlock
            srcCode={htmlScript + "<style>*{margin:0px;}</style>"}
            manual={markdown}
          />
        ) : (
          <></>
        )}
      </>
    </>
  );
}

export default TabMenu;

import styled from "styled-components";
import styles from "../styles";
import { useState } from "react";
import CalculetBlock from "../calculet-block/CalculetBlock";
import BigTitle from "./BigTitle";
import { TabMenu } from "./TabMenu";
import CodeEditor from "./CodeEditor";

// 가장 바깥 스타일 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: ${styles.styleLayout.basic900};
`;

/**
 * 계산기 코드 작성 컴포넌트
 * - HTML, MARKDOWN, 미리 보기
 * @param {*} props
 */
function WriteCode(props) {
  const [code, setCode] = useState(true);
  const [markdown, setMarkdown] = useState(false);
  const [preview, setPreview] = useState(false);

  /**
   * Tab 버튼 onClick 함수 - 각 state를 true 값으로 변경
   * @param {*} event
   */
  function onClickButtonTab(event) {
    if (event.target.id === "HTML") {
      setCode(true);
      setMarkdown(false);
      setPreview(false);
    } else if (event.target.id === "MARKDOWN") {
      setCode(false);
      setMarkdown(true);
      setPreview(false);
    } else {
      setCode(false);
      setMarkdown(false);
      setPreview(true);
    }
  }

  // 탭 메뉴 정보 객체 배열
  const writeCodeTab = [
    {
      text: "HTML",
      icon: "Code",
      isClick: code,
      onClick: onClickButtonTab,
    },
    {
      text: "MARKDOWN",
      icon: "MarkDown",
      isClick: markdown,
      onClick: onClickButtonTab,
    },
    {
      text: "미리 보기",
      icon: "Eye",
      isClick: preview,
      onClick: onClickButtonTab,
    },
  ];

  /**
   * 모나코 에디터 값 관리하는 mount 함수
   * @param {*} editor
   */
  function onMount(editor) {
    props.editorRef.current = editor;
  }

  return (
    <Wrapper>
      <BigTitle content="계산기 코드 입력하기" />
      <TabMenu tabs={writeCodeTab} />
      <>
        {code && (
          <CodeEditor
            defaultLanguage="html"
            defaultValue={props.htmlScript}
            onMount={onMount}
            onChange={props.htmlScriptChange}
          />
        )}
        {markdown && (
          <CodeEditor
            defaultLanguage="markdown"
            defaultValue={props.markdown}
            onMount={onMount}
            onChange={props.markdownChange}
          />
        )}
        {preview && (
          <CalculetBlock
            srcCode={props.htmlScript + "<style>*{margin:0px;}</style>"}
            manual={props.markdown}
          />
        )}
      </>
    </Wrapper>
  );
}

export default WriteCode;

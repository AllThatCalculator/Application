import styles from "../styles";
import { useState } from "react";
import CalculetBlock from "../calculet-block/CalculetBlock";
import { TabMenu } from "./TabMenu";
import CodeEditor from "./CodeEditor";
import BigTitle from "../atom-components/BigTitle";
import { FlexColumnLayout } from "../Layout";

/**
 * 계산기 코드 작성 컴포넌트
 * - HTML, MARKDOWN, 미리 보기
 * @param {*} props
 */
function WriteCode(props) {
  // Tab 버튼에서 선택된 값
  const [item, setItem] = useState("HTML");

  /**
   * Tab 버튼 onClick 함수
   * @param {*} event
   */
  function onClickButtonTab(event) {
    setItem(event.target.id);
  }

  // 탭 메뉴 정보 객체 배열
  const writeCodeTab = [
    {
      text: "HTML",
      icon: "Code",
      item: item,
      onClick: onClickButtonTab,
    },
    {
      text: "MARKDOWN",
      icon: "MarkDown",
      item: item,
      onClick: onClickButtonTab,
    },
    {
      text: "미리 보기",
      icon: "Eye",
      item: item,
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
    <FlexColumnLayout gap={styles.styleLayout.basic900}>
      <BigTitle content="계산기 코드 입력하기" />
      <TabMenu tabs={writeCodeTab} />
      <>
        {item === "HTML" && (
          <CodeEditor
            defaultLanguage="html"
            defaultValue={props.htmlScript}
            onMount={onMount}
            onChange={props.changeHtmlScript}
          />
        )}
        {item === "MARKDOWN" && (
          <CodeEditor
            defaultLanguage="markdown"
            defaultValue={props.markdown}
            onMount={onMount}
            onChange={props.changeMarkdown}
          />
        )}
        {item === "미리 보기" && (
          <>
            <CalculetBlock
              srcCode={props.htmlScript + "<style>*{margin:0px;}</style>"}
              manual={props.markdown}
            />
          </>
        )}
      </>
    </FlexColumnLayout>
  );
}

export default WriteCode;

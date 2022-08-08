import styled from "styled-components";
import styles from "../styles";
import { useState } from "react";
import CalculetBlock from "../calculet-block/CalculetBlock";
import { TabMenu } from "./TabMenu";
import CodeEditor from "./CodeEditor";
import BigTitle from "../atom-components/BigTitle";
import {
  FlexColumnLayout,
  FlexRowLayout,
  ResponsiveTabletLayout,
} from "../Layout";
import { CustomPanel } from "./CustomPanel";

const WrapperSrcCode = styled.div`
  width: 713px;
  min-height: 486px;
  height: 100%;
`;

const WrapperManual = styled.div`
  width: 100%;
  height: 486px;
`;

const WrapperPannel = styled.div`
  width: 347px;
`;

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

  return (
    <FlexColumnLayout gap={styles.styleLayout.basic900}>
      <BigTitle content="계산기 코드 입력하기" />
      <TabMenu tabs={writeCodeTab} />
      <FlexRowLayout>
        {item === "HTML" && (
          <ResponsiveTabletLayout rowGap="20px" columnGap="20px">
            <WrapperSrcCode>
              <CodeEditor
                defaultLanguage="html"
                defaultValue={props.srcCode}
                setData={props.setSrcCode}
              />
            </WrapperSrcCode>
            <WrapperPannel>
              <CustomPanel />
            </WrapperPannel>
          </ResponsiveTabletLayout>
        )}
        {item === "MARKDOWN" && (
          <WrapperManual>
            <CodeEditor
              defaultLanguage="markdown"
              defaultValue={props.manual}
              setData={props.setManual}
            />
          </WrapperManual>
        )}
        {item === "미리 보기" && (
          <CalculetBlock srcCode={props.previewSrcCode} manual={props.manual} />
        )}
      </FlexRowLayout>
    </FlexColumnLayout>
  );
}

export default WriteCode;

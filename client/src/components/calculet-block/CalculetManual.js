import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styled from "styled-components";
import { BtnToggle } from "../atom-components/ButtonIcon";
import { BtnGray } from "../atom-components/ButtonTemplate";
import { FlexRowLayout } from "../Layout";
import styles from "../styles";
import RecordCalculetHistory from "./RecordCalculetHistory";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const WrapperButton = styled(FlexRowLayout)`
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${styles.styleLayout.basic700};
`;

/**
 * 마크다운 문법으로 작성된 문자열을 리액트 컴포넌트로 반환하는 함수
 * @param {string} content 마크다운 문법으로 이루어진 string
 * 내부 함수 = code -> 재귀적으로 코드블럭에 syntax highlight 적용
 */
function MarkdownCode({ content }) {
  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              // style={dark}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

const MarkdownWrapper = styled.div`
  background-color: tomato;
  ${styles.sytleText.text100}
`;

/**
 * 계산기 설명서(매뉴얼)를 볼 것인지 선택하는 토글 버튼과 설명문을 포함하는 컴포넌트
 * @param {string} content 마크다운 문법으로 이루어진 string
 * @param {string} calculetId 계산기 번호
 */
function CalculetManual({ content, calculetId }) {
  // 설명서를 펼칠지 여부를 저장하는 state
  const [visibility, setVisibility] = useState(false);

  /**
   * visibility 값을 반전시키는 버튼 이벤트 함수
   */
  function toggle() {
    setVisibility((current) => !current);
  }

  return (
    <>
      <div>
        <WrapperButton>
          <BtnGray text="자세히" isToggle={visibility} onClick={toggle} />
          <RecordCalculetHistory calculetId={calculetId} />
        </WrapperButton>
        {visibility && (
          <>
            <MarkdownWrapper>
              <MarkdownCode content={content} />
            </MarkdownWrapper>
            <Wrapper>
              <BtnToggle onClick={toggle} />
            </Wrapper>
          </>
        )}
      </div>
    </>
  );
}

export default CalculetManual;

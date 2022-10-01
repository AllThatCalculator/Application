import { forwardRef } from "react";
import styled from "styled-components";
import { FlexRowLayout } from "../Layout";
import styles from "../styles.js";

/**
 * Heading 컴포넌트의 스타일 정의
 */
const StyledHeading = styled(FlexRowLayout)`
  width: 100%;

  ${(props) =>
    (props.h === 1 && `${styles.sytleText.text250b}`) ||
    (props.h === 2 && `${styles.sytleText.text200}`)};

  color: ${(props) => props.color};

  border-bottom: ${(props) =>
    props.isLine && `1px solid ${styles.styleColor.blue50}`};
  padding-bottom: ${(props) =>
    props.isLine && `${styles.styleLayout.basic900}`};
`;

/**
 * 제목 스타일 h1, h2...
 * @param {object} props 인자
 * @param {*} ref 컴포넌트 참조 (참조할 때만 기입)
 * -> content: 내용
 * -> h : 제목 요소 (h1, h2 ...) (h1 쓰려면, 1 을 인자로 주기)
 * -> color : 색 (기본값 black)
 * -> isLine : 아래 구분선 여부 (있을 때만 true 기입)
 * -> id : 제목 id (기본값 : 내용)
 */
function Heading(props, ref) {
  const contentId = props.id ? props.id : props.content;
  const contentRef = ref === null ? null : ref;
  return (
    <StyledHeading
      id={contentId}
      ref={contentRef}
      h={props.h}
      color={props.color}
      isLine={props.isLine}
    >
      {props.content}
    </StyledHeading>
  );
}
export default forwardRef(Heading);

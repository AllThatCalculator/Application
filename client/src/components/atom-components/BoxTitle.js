import styled from "styled-components";
import styles from "../styles.js";

/**
 * BoxTitle 컴포넌트의 스타일 정의
 */
const StyledBoxTitle = styled.div`
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text400};
`;

/**
 * 경계선 있는 박스의 제목 컴포넌트
 * @param {string}
 * content: 제목 글씨
 */
function BoxTitle({ content }) {
  return <StyledBoxTitle>{content}</StyledBoxTitle>;
}

export default BoxTitle;

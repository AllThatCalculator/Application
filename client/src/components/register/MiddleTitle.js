import styled from "styled-components";
import styles from "../styles.js";

// MiddleTitle 컴포넌트의 스타일 정의
const StyledMiddleTitle = styled.div`
  display: flex;
  align-items: center;
  ${styles.sytleText.text200};
  color: ${styles.styleColor.blue900};
`;

/**
 * 중간 크기 타이틀
 * @param {string}
 * content: 제목 글씨
 */
function MiddleTitle({ content }) {
  return <StyledMiddleTitle>{content}</StyledMiddleTitle>;
}

export default MiddleTitle;

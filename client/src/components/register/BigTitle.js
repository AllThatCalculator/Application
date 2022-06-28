import styled from "styled-components";
import styles from "../styles.js";

// BigTitle 컴포넌트의 스타일 정의
const StyledBigTitle = styled.div`
  padding: 0px 0px 0px ${styles.styleLayout.basic900};
  border-left: 3px solid ${styles.styleColor.blue400};
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text300};
  align-self: flex-start;
`;

/**
 * 왼쪽에 줄이 그어져있는 대제목 컴포넌트
 * @param {string}
 * content: 제목 글씨
 */
function BigTitle({ content }) {
  return <StyledBigTitle>{content}</StyledBigTitle>;
}

export default BigTitle;

import styled from "styled-components";
import styles from "../styles.js";

// 작은 글씨 제목에 대한 스타일 정의
const StyledSmallTitle = styled.div`
  color: ${styles.styleColor.gray100};
  ${styles.sytleText.text100};
`;

/**
 * 정보 입력 칸의 인풋을 설명하는 작은 글씨
 * @param {string}
 * content: 제목 글씨
 */
function SmallTitle({ content }) {
  return <StyledSmallTitle>{content}</StyledSmallTitle>;
}

export default SmallTitle;

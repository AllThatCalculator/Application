import styled from "styled-components";
import styles from "../styles.js";
const StyledDiv = styled.div`
  color: ${styles.styleColor.white300};
  ${styles.sytleText.text400}
  ${styles.styleEffect.opacity200};
`;

/**
 *
 * 인자로 받은 설명글을 흰색 설명글로 반환하는 함수
 *
 * @param {string}
 * text : 설명글
 *
 */
function TextWhite({ text }) {
  return <StyledDiv>{text}</StyledDiv>;
}
export default TextWhite;

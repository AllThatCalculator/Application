import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../styles";
import { Font } from "./StyledText";

// Link 버튼 스타일드
const StyledBigLink = styled(Link)`
  text-decoration: none;
  :hover {
    text-decoration: underline ${styles.styleColor.blue500};
  }
`;

/**
 * Text300 큰 Link 컴포넌트
 * @param {int, string, string}
 * key : unique key
 * to : url
 * content : link 할 내용
 */
export default function BigLink({ key, to, content }) {
  return (
    <StyledBigLink key={key} to={to}>
      <Font font="text300" color={styles.styleColor.blue500}>
        {content}
      </Font>
    </StyledBigLink>
  );
}

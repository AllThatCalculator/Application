import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../styles";

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  ${styles.sizes.desktopWidth200};
  padding: ${styles.styleLayout.basic300};
  gap: ${styles.styleLayout.basic700};
  background: ${styles.styleColor.black50.color};
  opacity: ${styles.styleColor.black50.opacity};
`;
// 해당 계산기 페이지로 넘어갈 수 있도록 Link를 스타일드 했다.
const StyledLink = styled(Link)`
  color: ${styles.styleColor.white300};
  ${styles.sytleText.text100};
  text-decoration-line: none;
`;
/**
 * 북마크한 계산기 리스트 컴포넌트를 반환하는 함수
 *
 */
function Bookmark() {
  return (
    <Positioner>
      <StyledLink to="/calculet/:id">사칙연산 계산기</StyledLink>
      <StyledLink to="/calculet/:id">미적분 계산기</StyledLink>
      <StyledLink to="/calculet/:id">날짜 계산기</StyledLink>
      <StyledLink to="/calculet/:id">날짜 계산기</StyledLink>
      <StyledLink to="/calculet/:id">날짜 계산기</StyledLink>
      <StyledLink to="/calculet/:id">날짜 계산기</StyledLink>
      <StyledLink to="/calculet/:id">날짜 계산기</StyledLink>
      <StyledLink to="/calculet/:id">날짜 계산기</StyledLink>
    </Positioner>
  );
}

export default Bookmark;

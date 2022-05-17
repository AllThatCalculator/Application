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
const StyledLink = styled(Link)`
  color: ${styles.styleColor.white300};
  ${styles.sytleText.text100};
  text-decoration-line: none;
`;
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

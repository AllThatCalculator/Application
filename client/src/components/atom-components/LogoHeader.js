import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import URL from "../PageUrls.js";
import styles from "../styles.js";
const StyledButton = styled.button`
  display: flex;
  min-width: max-content;
  background: transparent;
  color: ${styles.styleColor.white300};
  ${styles.sytleText.LogoTitle}

  border: none;
  ${styles.styleEffect.opacity200};

  cursor: pointer;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
/**
 *
 * 헤더에 놓을 로고를 반환하는 함수
 * -> 클릭 시, 홈페이지로 이동
 */
export default function LogoHeader() {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => (window.location.href = "/")}>
      All That Calculator
    </StyledButton>
  );
}

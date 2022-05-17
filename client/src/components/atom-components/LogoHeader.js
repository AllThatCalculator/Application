import styled from "styled-components";
import { React } from "react";
import styles from "../styles.js";
const StyledDiv = styled.div`
  display: flex;
  color: ${styles.styleColor.white300};
  ${styles.sytleText.LogoTitle}
  ${styles.styleEffect.opacity200};
  min-width: max-content;
  align-items: center;
`;
function LogoHeader() {
  return (
    <>
      <StyledDiv>All That Calculator</StyledDiv>
    </>
  );
}
export default LogoHeader;

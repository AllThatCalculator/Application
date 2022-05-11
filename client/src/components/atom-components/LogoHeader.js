import styled from "styled-components";
import { React } from "react";
import styles from "../styles.js";
const StyledDiv = styled.div`
  color: ${styles.styleColor.white300};
  ${styles.sytleText.LogoTitle}
  ${styles.styleEffect.opacity200};
  min-width: max-content;
`;
function LogoHeader() {
  return (
    <>
      <StyledDiv>All That Calculator</StyledDiv>
    </>
  );
}
export default LogoHeader;

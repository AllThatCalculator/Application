import styled from "styled-components";
import propTypes from "prop-types";
import { React } from "react";
import styles from "../styles.js";
const StyledDiv = styled.div`
  color: ${styles.styleColor.white300};
  ${styles.sytleText.text400}
  ${styles.styleEffect.opacity200};
`;
function TextWhite({ text }) {
  return (
    <>
      <StyledDiv>{text}</StyledDiv>
    </>
  );
}
TextWhite.propTypes = {
  text: propTypes.string.isRequired,
};
export default TextWhite;

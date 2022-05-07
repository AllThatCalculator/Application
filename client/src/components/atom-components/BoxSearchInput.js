import styled from "styled-components";
import propTypes from "prop-types";
import { React } from "react";
import styles from "../styles.js";

//스타일드 버튼
const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  width: 566px;
  align-items: center;

  padding: ${styles.styleLayout.basic500};

  background: ${styles.styleColor.white50.color};
  opacity: ${styles.styleColor.white50.opacity};
  color: ${styles.styleColor.black};

  ${styles.styleBorder.basic100};
  ${styles.styleEffect.opacity100};

  outline: none;
`;

function BoxSearchInput({ text }) {
  return (
    <>
      <StyledInput type="text" placeholder={text}></StyledInput>
    </>
  );
}
BoxSearchInput.propTypes = {
  text: propTypes.string.isRequired,
};
export default BoxSearchInput;

import styled from "styled-components";
import { React } from "react";
import styles from "../styles.js";
import { BtnSmallIcon, BtnMiddleIcon, BtnInputIcon } from "./ButtonIcon.js";

//스타일드 버튼
const StyledInput = styled.input`
  width: 100%;
  min-width: 240px;
  box-sizing: border-box;
  background: ${styles.styleColor.white50.color};
  opacity: ${styles.styleColor.white50.opacity};
  padding: ${styles.styleLayout.basic800};
  color: ${styles.styleColor.black};
  border: ${styles.styleLayout.basic100} solid black;

  ${styles.styleBorder.basic100};
  ${styles.styleEffect.opacity100};

  ${styles.sytleText.text100};
  outline: none;
`;
const StyledDiv = styled.div`
  position: relative;
  align-items: center;
  display: inline-block;
`;

function BoxSearchInput({ text }) {
  return (
    <>
      <StyledDiv>
        <StyledInput type="search" placeholder={text} />
        <BtnInputIcon text="검색" icon="Search" color="blue" />
      </StyledDiv>
    </>
  );
}
export default BoxSearchInput;

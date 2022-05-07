import styled from "styled-components";
import { React } from "react";
import ButtonWhite from "../atom-components/ButtonWhite.js";
import TextWhite from "../atom-components/TextWhite.js";

import styles from "../styles.js";
import ButtonIcon from "../atom-components/ButtonIcon.js";

// 페이지 넘기는 거 감싼거
const Positioner = styled.div`
  display: flex;
  width: 162px;
  justify-content: space-around;
`;
const StyledButton = styled.button`
  height: 14px;
  width: 14px;
  background: ${styles.styleColor.black25.color};
  opacity: ${styles.styleColor.black25.opacity};
  border-radius: 100%;
  border: none;
  cursor: pointer;
`;
function MovePage() {
  return (
    <Positioner>
      <ButtonIcon text="왼쪽페이지" icon="BsChevronLeft" />
      <StyledButton></StyledButton>
      <StyledButton></StyledButton>
      <StyledButton></StyledButton>
      <StyledButton></StyledButton>
      <StyledButton></StyledButton>
      <ButtonIcon text="오른쪽페이지" icon="BsChevronRight" />
    </Positioner>
  );
}

export default MovePage;

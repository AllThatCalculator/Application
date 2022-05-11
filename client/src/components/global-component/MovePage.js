import styled from "styled-components";
import { React } from "react";

import styles from "../styles.js";
import {
  BtnSmallIcon,
  BtnMiddleIcon,
  BtnInputIcon,
} from "../atom-components/ButtonIcon.js";

// 페이지 넘기는 거 감싼거
const Positioner = styled.div`
  display: flex;
  gap: ${styles.styleLayout.basic700};
  width: 162px;
  justify-content: space-around;
`;
const StyledButton = styled.button`
  ${styles.styleSize.middle};
  background: ${styles.styleColor.black25.color};
  opacity: ${styles.styleColor.black25.opacity};
  border-radius: 100%;
  border: none;
  cursor: pointer;
`;
function MovePage() {
  return (
    <Positioner>
      <BtnSmallIcon text="왼쪽페이지" icon="BsChevronLeft" />
      <StyledButton />
      <StyledButton />
      <StyledButton />
      <StyledButton />
      <StyledButton />
      <BtnSmallIcon text="오른쪽페이지" icon="BsChevronRight" />
    </Positioner>
  );
}
export default MovePage;

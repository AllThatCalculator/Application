import styled from "styled-components";
import { React } from "react";
import ButtonIcon from "../atom-components/ButtonIcon.js";
import LogoHeader from "../atom-components/LogoHeader.js";
import BoxSearchInput from "../atom-components/BoxSearchInput.js";
import ButtonWhite from "../atom-components/ButtonWhite.js";
import TextWhite from "../atom-components/TextWhite.js";

import styles from "../styles.js";
import BoxRecCalculator from "../atom-components/BoxRecCalculator.js";
import MovePage from "./MovePage.js";

// 모듈 + 페이지넘기는 버튼 감싼거
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 계산기 추천 모듈 감싼거
const Positioner = styled.div`
  display: flex;

  width: 897px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;
function Recommend() {
  return (
    <Container>
      <Positioner>
        <BoxRecCalculator
          name="사칙연산"
          description="사칙연산을 하는 계산기입니다."
          profileImg="blue"
        />
        <BoxRecCalculator
          name="사칙연산"
          description="사칙연산을 하는 계산기입니다."
          profileImg="blue"
        />
        <BoxRecCalculator
          name="사칙연산"
          description="사칙연산을 하는 계산기입니다."
          profileImg="blue"
        />
      </Positioner>
      <MovePage />
    </Container>
  );
}

export default Recommend;

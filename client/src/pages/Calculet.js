import ButtonBlue from "../components/atom-components/ButtonBlue";
import Recommend from "../components/global-component/Recommend";
import styled from "styled-components";
import CalculetBlock from "../components/calculetBlock/CalculetBlock";
import { useState } from "react";
import styles from "../components/styles";

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 14px;
  background: ${styles.styleColor.blue30};
  margin-bottom: 15px;
  padding: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 897px;
`;
function Calculet() {
  const [calculetObj, setCalculetObj] = useState({
    name: "사칙연산 계산기",
    id: 1,
    srcCode: null,
    contributor: "bsa0322",
    manual: null,
    description: "사칙연산 계산기입니다.",
    statistics: {
      bookmarkCnt: 10,
      likeCnt: 5,
      reportCnt: 1,
      viewCnt: 100,
      calculationCnt: 10,
      userCnt: 10,
    },
  });
  return (
    <>
      <Positioner>
        <Wrapper>
          <CalculetBlock calculetObj={calculetObj} />
        </Wrapper>
        <ButtonBlue text="계산기 등록" icon="BsUpload" />
      </Positioner>
      <Recommend />
    </>
  );
}

export default Calculet;

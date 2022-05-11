import ButtonBlue from "../components/atom-components/ButtonBlue";
import Recommend from "../components/global-component/Recommend";
import styled from "styled-components";
import CalculetBlock from "../components/calculetBlock/CalculetBlock";
import { useState } from "react";
import styles from "../components/styles";
import {
  ButtonTemplate,
  BtnWhite,
  BtnBlue,
  BtnGray,
} from "../components/atom-components/ButtonTemplate";
import TextWhite from "../components/atom-components/TextWhite";
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: ${styles.styleLayout.basic300};
  background: ${styles.styleColor.blue30};
  padding: ${styles.styleLayout.basic300};
`;
// 계산기 블록
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
// 계산기 등록 버튼
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${styles.styleLayout.basic300};
`;
const Explain = styled.div`
  ${styles.sytleText.text200}
`;
// 계산기 블록 밑
const WrapperBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic300};
`;

// 계산기 추천
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
        <ButtonWrapper>
          <Explain>자신만의 계산기를 만드세요!</Explain>
          <BtnBlue text="계산기 등록" icon="Upload" />
        </ButtonWrapper>
      </Positioner>
      <WrapperBottom>
        <TextWhite text="다른 계산기들도 있어요 🤗" />
        <BtnWhite text="더보기" />
      </WrapperBottom>
      <Recommend />
    </>
  );
}

export default Calculet;

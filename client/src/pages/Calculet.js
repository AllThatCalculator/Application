import styled from "styled-components";
import CalculetBlock from "../components/calculet-block/CalculetBlock";
import { useState } from "react";
import styles from "../components/styles";
import {
  BtnWhite,
  BtnBlue,
} from "../components/atom-components/ButtonTemplate";
import TextWhite from "../components/atom-components/TextWhite";
import Recommend from "../components/global-component/Recommend";
import BookmarkBar from "../components/global-component/BookmarkBar";

// 계산기 블록 배경
const Positioner = styled.div`
  background: ${styles.styleColor.white200.color};
  opacity: ${styles.styleColor.white200.opacity};
`;
// 계산기 등록 버튼 배경
const PositionerBottom = styled.div`
  background: ${styles.styleColor.blue30};
  ${styles.styleEffect.opacity300};
`;
// 계산기 블록 감쌈
const BoxCalculet = styled.div`
  margin: 0 auto;
  ${styles.sizes.desktop};
  padding: ${styles.styleLayout.basic350};
`;
// 계산기 등록 버튼 감쌈
const BoxCalculetBottom = styled(BoxCalculet)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${styles.styleLayout.basic750};
  gap: ${styles.styleLayout.basic300};
`;
const Wrapper = styled.div`
  display: flex;
`;
const WrapperCol = styled(BoxCalculet)`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic700};
`;
// 설명
const Explain = styled.div`
  ${styles.sytleText.text200}
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
        <BoxCalculet>
          <CalculetBlock calculetObj={calculetObj} />
        </BoxCalculet>
      </Positioner>

      <PositionerBottom>
        <BoxCalculetBottom>
          <Explain>자신만의 계산기를 만드세요!</Explain>
          <BtnBlue text="계산기 등록" icon="Upload" />
        </BoxCalculetBottom>
      </PositionerBottom>

      <WrapperCol>
        <WrapperCol>
          <TextWhite text="다른 계산기들도 있어요 🤗" />
          <Wrapper>
            <BtnWhite text="더보기" />
          </Wrapper>
        </WrapperCol>
        <Wrapper>
          <Recommend />
        </Wrapper>
      </WrapperCol>
    </>
  );
}

export default Calculet;

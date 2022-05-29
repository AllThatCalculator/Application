import styled from "styled-components";
import CalculetBlock from "../components/calculet-block/CalculetBlock";
import { useEffect, useState } from "react";
import styles from "../components/styles";
import {
  BtnWhite,
  BtnBlue,
} from "../components/atom-components/ButtonTemplate";
import TextWhite from "../components/atom-components/TextWhite";
import Recommend from "../components/global-component/Recommend";
import CalculetHeader from "../components/calculet-block/CalculetHeader";

// (임시) html 파일 string으로 읽어오기 위해 사용
// -> 백엔드 연결 이후에는 http request로 계산기 정보들과 함께 받음
// eslint-disable-next-line
import srcCode from "raw-loader!../calculets/arithmeticOperation/arithmeticOperation.html";

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
  // 계산기 객체
  // {object} calculetObj 계산기 객체
  //         {string} name: "사칙연산 계산기", - 계산기 이름
  //         {integer} id: 1,                 - 계산기 id
  //         {string} srcCode: null,          - 계산기 소스코드
  //         {string} contributor: "bsa0322", - 계산기 저작자
  //         {string} manual: null,           - 계산기 설명 마크다운
  //         {string} description: "사칙연산 계산기입니다.", - 계산기 한줄 설명
  const [calculetObj, setCalculetObj] = useState(null);
  // {object}  statistics: {
  //   {integer} bookmarkCnt: 10,  - 북마크 수
  //   {boolean} bookmarked: false - 유저가 북마크를 해두었는지 여부
  //   {integer} likeCnt: 5,       - 좋아요 수
  //   {boolean} liked: false      - 유저가 좋아요를 눌러 두었는지 여부
  //   {integer} reportCnt: 1,     - 신고 수
  //   {integer} viewCnt: 100,     - 조회수
  //   {integer} calculationCnt: 10, - 연산수
  //   {integer} userCnt: 10,      - 사용자 수
  // },
  const [statistics, setStatistics] = useState(null);

  /**
   * (임시) 마크다운 파일 string으로 읽어오는 함수
   */
  async function loadCalculetManual() {
    fetch(
      require("../calculets/arithmeticOperation/arithmeticOperation.md")
    ).then((res) => res.text());
  }

  /**
   * (임시) 계산기 정보 불러오는 함수
   * -> 백엔드 도입하면 http request로 받아올 예정
   */
  useEffect(() => {
    setTimeout(() => {
      setCalculetObj({
        name: "사칙연산 계산기",
        id: 1,
        srcCode: srcCode,
        contributor: "bsa0322",
        manual: loadCalculetManual(),
        description: "사칙연산 계산기입니다.",
      });
      setStatistics({
        bookmarkCnt: 10,
        bookmarked: false,
        likeCnt: 5,
        liked: false,
        reportCnt: 1,
        viewCnt: 100,
        calculationCnt: 10,
        userCnt: 10,
      });
    }, 1000);
  }, []);

  return (
    <>
      <Positioner>
        <WrapperCol>
          {calculetObj !== null ? (
            <>
              <CalculetHeader
                name={calculetObj.name}
                contributor={calculetObj.contributor}
                statistics={statistics}
              />
              <CalculetBlock
                srcCode={calculetObj.srcCode}
                manual={calculetObj.manual}
              />
            </>
          ) : (
            <div></div> // 로딩화면
          )}
        </WrapperCol>
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

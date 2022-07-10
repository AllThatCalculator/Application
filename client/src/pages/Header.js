import styled from "styled-components";
import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import styles from "../components/styles.js";
import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";
import CategoryBar from "../components/global-component/CategoryBar";
import React, { useState } from "react";

// 상단 고정
const Positioner = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 60px;
  padding: ${styles.styleLayout.basic600};
  z-index: 100;
`;
// 내용 정렬
const WhiteBackground = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: ${styles.styleLayout.basic700};
`;
const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: ${styles.styleLayout.basic700};
`;
/**
 * 헤더
 * -> 계산기 카테고리, 로고, 검색창, 로그인 버튼
 *
 */
function Header() {
  // 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
  const [aniMode, setAniMode] = useState(false);

  // aniMod 값을 반전시키는 버튼 이벤트 함수
  function onIsOpen() {
    setAniMode(!aniMode);
  }

  // 카테고리 바에 들어갈 계산기 대분류 & 소분류 정보
  const contentsCategory = [
    {
      category_main: "수학",
      category_sub: [
        {
          name: "계산",
          calculets: ["사칙연산", "변수", "함수", "미적분 계산기"],
        },
        { name: "통계", calculets: [] },
        { name: "기하", calculets: ["각도", "외심내심"] },
      ],
    },
    {
      category_main: "과학-공학",
      category_sub: [
        { name: "과학", calculets: ["단위 변환기", "물리 계산기"] },
        { name: "공학", calculets: ["진법 계산기"] },
      ],
    },
  ];

  return (
    <>
      <Positioner>
        <WhiteBackground>
          <HeaderContents>
            <BtnMiddleIcon
              text="메뉴"
              icon="List"
              color="white"
              onClick={onIsOpen}
            />
            <LogoHeader />
          </HeaderContents>
          <HeaderContents>
            <BoxSearchInput text="계산하고 싶은 것을 검색하세요." />
            <BtnWhite text="로그인" icon="Person" />
          </HeaderContents>
        </WhiteBackground>
      </Positioner>
      <CategoryBar contents={contentsCategory} aniMode={aniMode}></CategoryBar>
    </>
  );
}

export default Header;

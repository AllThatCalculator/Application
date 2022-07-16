import styled from "styled-components";
import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import styles from "../components/styles.js";
import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";
import CategoryBar from "../components/global-component/CategoryBar";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// 상단 고정
const Positioner = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 60px;
  padding: ${styles.styleLayout.basic600};
  z-index: 100;
  background: ${(props) => props.isChange && `${styles.styleColor.blue100}`};
`;
// 내용 정렬
const WhiteBackground = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${styles.styleLayout.basic700};
`;
const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: ${styles.styleLayout.basic700};
`;
/**
 *  * 헤더 contents
 * -> 카테고리바, 로고, 검색창, 로그인 버튼
 * @param {function, function} param0
 * onIsOpen : 버튼 이벤트 (카테고리바 이벤트)
 * onLogin : 로그인 페이지로 이동 이벤트 (로그인 이벤트)
 */
function Contents({ onIsOpen, onLogin }) {
  return (
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
        <BtnWhite text="로그인" icon="Person" onClick={onLogin} />
      </HeaderContents>
    </WhiteBackground>
  );
}

/**
 * 헤더
 * -> 스크롤 내리면 색 바뀜
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

  // 스크롤의 위치
  const [scrollPosition, setScrollPosition] = useState(0);
  // 색 변화 상태
  const [isChange, setIsChange] = useState(false);
  // 스크롤 위치 변화에 따라 'scrollPosition' 변화와 'isChange' 변화
  function updateScroll() {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    if (scrollPosition < 10) setIsChange(false);
    else setIsChange(true);
  }
  // 스크롤 위치 감지
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  /**
   * 로그인 페이지로 이동 이벤트
   */
  function onLogin() {
    window.location.href = "/login";
  }
  return (
    <>
      <Positioner isChange={isChange}>
        <Contents onIsOpen={onIsOpen} onLogin={onLogin} />
      </Positioner>
      <CategoryBar contents={contentsCategory} aniMode={aniMode}></CategoryBar>
    </>
  );
}

export default Header;

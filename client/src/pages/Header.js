import styled from "styled-components";
import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import styles from "../components/styles.js";
import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";
import { useState } from "react";
import { useEffect } from "react";

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

function Contents() {
  return (
    <WhiteBackground>
      <HeaderContents>
        <BtnMiddleIcon text="메뉴" icon="List" color="white" />
        <LogoHeader />
      </HeaderContents>
      <HeaderContents>
        <BoxSearchInput text="계산하고 싶은 것을 검색하세요." />
        <BtnWhite text="로그인" icon="Person" />
      </HeaderContents>
    </WhiteBackground>
  );
}

/**
 * 헤더
 * -> 스크롤 내리면 색 바뀜
 *
 * 메뉴(계산기 카테고리), 로고, 검색창, 로그인 버튼
 *
 */
function Header() {
  // 스크롤의 위치
  const [scrollPosition, setScrollPosition] = useState(0);
  // 색 변화 상태
  const [isChange, setIsChange] = useState(false);
  // 스크롤 위치 변화에 따라 'scrollPosition' 변화와 'isChange' 변화
  function updateScroll() {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    if (scrollPosition < 30) setIsChange(false);
    else setIsChange(true);
  }
  // 스크롤 위치 감지
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });
  return (
    <Positioner isChange={isChange}>
      <Contents />
    </Positioner>
  );
}

export default Header;

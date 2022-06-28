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
`;
const ChangePositioner = styled(Positioner)`
  background: ${styles.styleColor.blue100};
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
 * 메뉴(계산기 카테고리), 로고, 검색창, 로그인 버튼
 * -> 스크롤 내리면 색 바뀜
 *
 */
function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });
  return (
    <>
      {scrollPosition < 30 ? (
        <Positioner>
          <Contents></Contents>
        </Positioner>
      ) : (
        <ChangePositioner>
          <Contents></Contents>
        </ChangePositioner>
      )}
    </>
  );
}

export default Header;

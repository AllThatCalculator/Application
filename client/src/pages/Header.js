import styled from "styled-components";
import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import styles from "../components/styles.js";
import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";

// 상단 고정
const Positioner = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 60px;
  padding: ${styles.styleLayout.basic600};
  z-index: 99;
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
 * 메뉴(계산기 카테고리), 로고, 검색창, 로그인 버튼
 *
 */
function Header() {
  return (
    <Positioner>
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
    </Positioner>
  );
}

export default Header;

import styled from "styled-components";
import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import styles from "../components/styles.js";
import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";
import CategoryBar from "../components/global-component/CategoryBar";
import { useState } from "react";
import { useEffect } from "react";
import { FlexRowLayout } from "../components/Layout";
import { CategoryItems } from "../components/header/CategoryItems";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/user-actions/AuthUser";
import URL from "../components/PageUrls";
import LogoutUser from "../components/user-actions/LogoutUser";

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
const WhiteBackground = styled(FlexRowLayout)`
  justify-content: space-between;
  gap: ${styles.styleLayout.basic700};
`;
const HeaderContents = styled(FlexRowLayout)`
  align-items: center;
  gap: ${styles.styleLayout.basic700};
`;
/**
 * 헤더에 있는 컴포넌트들
 * -> 카테고리바, 로고, 검색창, 로그인/아웃 버튼
 * @param {function} onIsOpen 버튼 이벤트 (카테고리바 버튼 이벤트)
 * @param {function} onLogin 로그인 페이지로 이동 이벤트 (로그인 버튼 이벤트)
 * @param {function} onLogout 로그아웃 이벤트 (로그아웃 버튼 이벤트)
 */
function Contents({ onIsOpen, onLogin, onLogout }) {
  /**
   * 페이지 새로고침 되자마자 로그인 상태 확인하여 로그인/아웃 버튼 렌더
   */
  const [logBtn, setLogBtn] = useState(null);
  useEffect(onHandlerLogin, []);

  function onHandlerLogin() {
    AuthUser().then((res) => {
      !res.success
        ? setLogBtn(<BtnWhite text="로그인" icon="Person" onClick={onLogin} />)
        : setLogBtn(<BtnWhite text="로그아웃" onClick={onLogout} />);
    });
  }
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
        {logBtn}
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
  const navigate = useNavigate();
  /**
   * 카테고리바 animation의 mode 제어 state
   * true : 열 때 slideIn / false : 닫을 때 slideInOut
   */
  const [aniMode, setAniMode] = useState(false);

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
   * 로그아웃
   */
  function onHandlerLogout(event) {
    event.preventDefault();

    // 서버에 요청
    LogoutUser().then((res) => {
      // 로그아웃 성공
      if (res.success) {
        window.location.replace(URL.CALCULET);
      }
    });
  }

  return (
    <>
      <Positioner isChange={isChange}>
        <Contents
          onIsOpen={() => setAniMode(!aniMode)}
          onLogin={() => navigate(URL.LOGIN)}
          onLogout={onHandlerLogout}
        />
      </Positioner>
      <CategoryBar contents={CategoryItems} aniMode={aniMode}></CategoryBar>
    </>
  );
}

export default Header;

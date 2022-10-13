import styled from "styled-components";
import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import styles from "../components/styles.js";
import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";
import CategoryBar from "../components/global-components/CategoryBar";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { FlexRowLayout } from "../components/Layout";
import URL from "../components/PageUrls";

import calculetsUser from "../user-actions/calculetsUser";
import useClickOutside from "../hooks/useClickOutside";

import { authService } from "../firebase";

/**
 * header와 categoryBar 박스를 감싸는 스타일 정의
 */
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
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
function Contents({ isLoggedIn, onIsOpen, onLogin, onLogout }) {
  /**
   * 페이지 새로고침 되자마자 로그인 상태 확인하여 로그인/아웃 버튼 렌더
   */
  const [logBtn, setLogBtn] = useState(null);

  const onHandlerLogin = useCallback(() => {
    if (isLoggedIn) {
      setLogBtn(<BtnWhite text="로그아웃" onClick={onLogout} />);
    } else {
      setLogBtn(<BtnWhite text="로그인" icon="Person" onClick={onLogin} />);
    }
  }, [isLoggedIn, onLogin, onLogout]);

  useEffect(onHandlerLogin, [onHandlerLogin]);

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
function Header({ isLoggedIn }) {
  /**
   * 카테고리바 영역을 ref로 지정
   * categoryBarRef
   * -> elementRef : 카테고리 바 영역 ref
   * -> isActive : 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
   * -> setIsActive : 카테고리바 활성화 관리 함수
   */
  const categoryBarRef = useClickOutside();
  /**
   * 카테고리바 정보 (대분류, 소분류에 따른 계산기) 서버에서 불러오기
   * 페이지 렌더시 한 번만
   */
  const [contentsCategory, setContentsCategory] = useState(null);
  const onHandlerSetContentsCategory = useCallback(() => {
    calculetsUser().then((res) => {
      // 카테고리바 정보 불러오기 성공
      if (res.success) setContentsCategory(res.calculetLists);
    });
  }, []);
  useEffect(() => {
    onHandlerSetContentsCategory();
  }, [onHandlerSetContentsCategory]);

  /**
   * 스크롤의 위치
   */
  const [scrollPosition, setScrollPosition] = useState(0);
  /**
   * header의 색 변화 상태
   */
  const [isChange, setIsChange] = useState(false);
  /**
   * 스크롤 위치 변화에 따라 'scrollPosition' 변화와 'isChange' 변화
   */
  const updateScroll = useCallback(() => {
    setScrollPosition(window.pageYOffset);
    if (scrollPosition < 10) setIsChange(false);
    else setIsChange(true);
  }, [scrollPosition]);
  /**
   * 스크롤 위치 변화 감지
   */
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [updateScroll]);
  /**
   * 로그인 페이지로 이동 이벤트
   */
  function onHandlerLogin(event) {
    window.location.href = URL.LOGIN;
  }
  /**
   * 로그아웃
   */
  async function onHandlerLogout(event) {
    try {
      await authService.signOut();
      // 로그아웃 성공하면 메인 화면으로 새로고침
      window.location.href = URL.CALCULET;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Wrapper ref={categoryBarRef.elementRef}>
      <Positioner isChange={isChange}>
        <Contents
          isLoggedIn={isLoggedIn}
          onIsOpen={() => categoryBarRef.setIsActive(!categoryBarRef.isActive)}
          onLogin={onHandlerLogin}
          onLogout={onHandlerLogout}
        />
      </Positioner>
      {contentsCategory && (
        <CategoryBar
          contents={contentsCategory}
          isActive={categoryBarRef.isActive}
          setIsActive={categoryBarRef.setIsActive}
        />
      )}
    </Wrapper>
  );
}

export default Header;

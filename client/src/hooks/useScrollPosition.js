import { useState } from "react";

/**
 * 스크롤 위치에 따른 hook
 */
function useScrollPosition() {
  // 스크롤 위치
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  // 스크롤 위치 변화에 따라 'scrollPosition' 변화
  function updateScroll() {
    setScrollPosition(window.pageYOffset);
  }

  // 현재 스크롤 내렸는지
  function isMoveScroll() {
    return scrollPosition > 0;
  }

  // 제일 위로 스크롤 올리기
  function topScroll() {
    window.scrollTo(0, 0);
  }

  return { scrollPosition, updateScroll, isMoveScroll, topScroll };
}

export default useScrollPosition;

import { useRef } from "react";

/**
 * 버튼 클릭 시 해당 부분으로 스크롤 이동
 * behavior : 애니매이션
 * scrollTo: 스크롤 이동
 * + 위에 고정바 계산하여 높이 계산
 */
function UseMoveScroll() {
  const element = useRef(null);
  function onMoveToElement() {
    const location = element.current.offsetTop;
    window.scrollTo({ top: location - 80, behavior: "smooth" });
  }
  return { element, onMoveToElement };
}

export default UseMoveScroll;

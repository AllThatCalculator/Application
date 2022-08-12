import { useEffect, useRef, useState } from "react";

function useClickOutside() {
  /**
   * 영역에 접근할 ref
   */
  const elementRef = useRef();
  /**
   * 영역이 활성화 되었는지 여부
   * 영역의 활성화 관리 함수
   */
  const [isActive, setIsActive] = useState(false);
  function clickOutside(event) {
    /**
     * 클릭 된 영역이 ref의 밖 영역이라면
     */
    if (!elementRef.current.contains(event.target)) setIsActive(false);
  }
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return { elementRef, isActive, setIsActive };
}
export default useClickOutside;

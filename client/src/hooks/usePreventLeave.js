/** 윈도우 창 닫을 때 아직 저장하지 않았어! 경고문 띄우기 */
function usePreventLeave(unload = () => {}) {
  function listenr(event) {
    event.preventDefault();
    event.returnValue = "";
  }
  /** beforunload는 window가 닫히기 전에 funtion이 실행되도록 함. */
  /** enablePrevent : beforeunload 이벤트 리스너로 listener 지정 */
  function enablePrevent() {
    // console.log("이벤트 지정");
    window.addEventListener("beforeunload", listenr);
    /**
     * beforeunload 이벤트 리스너 지정되어 있을 때에 진짜로 나가면,
     * unload로 페이지 나갈 시 인자로 넘어온 unload함수 수행
     */
    window.addEventListener("unload", unload);
  }
  /** disablePrevent : beforeunload 이벤트 제거 */
  function disablePrevent() {
    // console.log("이벤트 제거");
    window.removeEventListener("beforeunload", listenr);
    window.removeEventListener("unload", unload);
  }

  return { enablePrevent, disablePrevent };
}

export default usePreventLeave;

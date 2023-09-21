/**
 * 클릭시(onMouseDown) document에 mousemove mouseup 이벤트를 등록한다.
 * element의 클릭 이벤트가 부모로 전파되지 않길 원할 경우 stopPropagation을 호출한다.
 * 클릭된 상태에서 마우스를 움직일시 mousemove에 등록 된 함수가 계속 호출된다.
 * 클릭(mousedown) 이벤트 발생시의 마우스 위치를 기준으로,
 * 이동(mousemove) 이벤트에서 상대적으로 이동한 거리(deltaX, deltaY)를 계산하고
 * 콜벡으로 받은 onDragChange에게 전달해준다.
 * mouseup 이벤트에서 mousemove 이벤트를 제거한다.
 * @param onDragChange
 * @param stopPropagation
 * @returns
 */

function mouseDownDrag(onDragChange, onMouseUp, stopPropagation) {
  return {
    onMouseDown: (clickEvent) => {
      // 2
      if (stopPropagation) clickEvent.stopPropagation();

      // 3
      const mouseMoveHandler = (moveEvent) => {
        // 4
        let deltaX = moveEvent.screenY - clickEvent.screenY;
        onDragChange(deltaX);
      };

      // 5
      const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        onMouseUp();
      };

      // 1
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler, { once: true });
    },
  };
}
export default mouseDownDrag;

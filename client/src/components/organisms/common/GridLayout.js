import RGL, { WidthProvider } from "react-grid-layout";
import {
  CALCULET_BUTTON,
  CHECK_BOX,
} from "../../../constants/calculetComponent";

// children으로 감싸려고 하니까 작동 안 됨.
const MyReactGridLayout = WidthProvider(RGL);
const reactGridLayout = {
  compactType: null, // 왼쪽 정렬 해제
  rowHeight: 56,
  cols: 12,
};
function getStyle(type) {
  switch (type) {
    case CALCULET_BUTTON:
    case CHECK_BOX:
      return { display: "flex", alignItems: "center" };
    default:
      return {};
  }
}

export { MyReactGridLayout, reactGridLayout, getStyle };

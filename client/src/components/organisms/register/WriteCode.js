import EditorPlayground from "./EditorPlayground";
import EditorSidebar from "./EditorSidebar";
import { FlexBox } from "../common/FlexBox";
import { DRAWER_WIDTH } from "../../../constants/register";

/**
 * 계산기 만들기
 * - 계산기 컴포넌트 조립
 * - 코드 작성
 * @param {*} props
 */
function WriteCode() {
  return (
    <FlexBox>
      <EditorSidebar drawerWidth={DRAWER_WIDTH} />
      <EditorPlayground />
    </FlexBox>
  );
}

export default WriteCode;

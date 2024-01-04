import { grey } from "@mui/material/colors";
import DragIndicator from "../common/DragIndicator.js";
import useHover from "../../../hooks/useHover";
import FloatButtonLayout from "../common/FloatButtonLayout.js";
import Deleter from "../common/Deleter.js";
import { EDITOR_ITEM_TYPES } from "../../../constants/register.js";

/**
 * 에디터 컴포넌트 (drag & drop)
 * @param {*} param0
 */
function EditorComponent({
  children,
  isCalculetButton,
  onClickOpenForm = () => {},
  onClickDelete = () => {},
  isDelete = false,
}) {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  return (
    <div onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
      {isDelete && (
        <FloatButtonLayout tooltip={`지우기`} placement="bottom-end">
          <Deleter
            isVisible={isHovered}
            sx={{ color: grey[800], right: -8 }}
            onClick={onClickDelete}
          />
        </FloatButtonLayout>
      )}
      <span className={`${EDITOR_ITEM_TYPES.EDITOR}`}>
        <div style={{ cursor: "Move" }}>
          <FloatButtonLayout
            tooltip={`드래그해서 옮기기${
              isCalculetButton ? `` : ` \n클릭해서 편집하기`
            }`}
          >
            <DragIndicator
              isVisible={isHovered}
              sx={{ color: grey[800], left: -8 }}
              onClick={onClickOpenForm}
            />
          </FloatButtonLayout>
          <div style={{ pointerEvents: "none" }}>{children}</div>
        </div>
      </span>
    </div>
  );
}

export default EditorComponent;

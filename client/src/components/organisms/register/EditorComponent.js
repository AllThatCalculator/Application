import { Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import DragIndicator from "../common/DragIndicator.js";
import useHover from "../../../hooks/useHover";

/**
 * 에디터 컴포넌트 (drag & drop)
 * @param {*} param0
 */
function EditorComponent({
  children,
  onClickDragIndicator = () => {},
  tooltip = "",
}) {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

  return (
    <div
      style={{
        // opacity: isDragging ? 0.4 : 1,
        cursor: "Move",
      }}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      onClick={onClickDragIndicator}
    >
      <Tooltip
        title={<div style={{ whiteSpace: "pre-line" }}>{tooltip}</div>}
        placement="bottom-start"
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [-10, 16],
              },
            },
          ],
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2000,
          }}
        >
          <DragIndicator
            isVisible={isHovered}
            sx={{ color: grey[800], left: -8 }}
          />
        </div>
      </Tooltip>
      <div
        style={{
          // opacity: isDragging ? 0.4 : 1,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default EditorComponent;

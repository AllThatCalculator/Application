import { Tooltip } from "@mui/material";

/**
 * 컴포넌트 위에 떠있는 버튼의 layout
 * @returns
 */
function FloatButtonLayout({ children, tooltip, placement = "bottom-start" }) {
  return (
    <Tooltip
      title={<div style={{ whiteSpace: "pre-line" }}>{tooltip}</div>}
      placement={placement}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: placement === "bottom-start" ? [-10, 16] : [10, 16],
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
        {children}
      </div>
    </Tooltip>
  );
}
export default FloatButtonLayout;

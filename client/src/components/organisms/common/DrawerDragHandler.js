import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import mouseDownDrag from "../../../utils/mouseDownDrag";

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function DrawerDragHandler({ onMouseDown, onMouseUp }) {
  return (
    <Box
      sx={{
        width: 1,
        height: "20px",
        cursor: "row-resize",
        "&:hover": {
          backgroundColor: grey[300],
        },
        transition: (theme) =>
          theme.transitions.create(["background-color"], {
            duration: theme.transitions.duration.standard,
          }),
        // 텍스트 드래그 방지
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
      }}
      {...mouseDownDrag(
        (deltaY) => {
          onMouseDown(deltaY);
        },
        onMouseUp,
        true
      )}
    >
      <Puller />
    </Box>
  );
}

export default DrawerDragHandler;

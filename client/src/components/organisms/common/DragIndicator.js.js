import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { styled } from "@mui/material/styles";

// drag handler
const DragIndicator = styled(({ isVisible, outlined, ...props }) => (
  <DragIndicatorIcon {...props} />
))(({ isVisible, outlined, theme }) => ({
  position: "absolute",
  cursor: "move",
  //   margin: "24px",
  zIndex: theme.zIndex.tooltip + 1,

  border: outlined ? "1px solid" : "",
  padding: outlined ? 1.2 : 0,
  boxShadow: outlined ? "" : theme.shadows[4],
  borderRadius: 4,
  backgroundColor: "white",

  opacity: isVisible ? 0.9 : 0,
  transition: theme.transitions.create(["opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default DragIndicator;

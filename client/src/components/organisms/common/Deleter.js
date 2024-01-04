import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

// deleter
const Deleter = styled(({ isVisible, outlined, ...props }) => (
  <CloseIcon {...props} />
))(({ isVisible, outlined, theme }) => ({
  position: "absolute",
  cursor: "pointer",
  //   margin: "24px",
  zIndex: theme.zIndex.tooltip + 1,

  border: outlined ? "1px solid" : "",
  padding: outlined ? 1.2 : 0,
  boxShadow: outlined ? "" : theme.shadows[4],
  borderRadius: 4,
  backgroundColor: "red",

  opacity: isVisible ? 0.9 : 0,
  transition: theme.transitions.create(["opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default Deleter;

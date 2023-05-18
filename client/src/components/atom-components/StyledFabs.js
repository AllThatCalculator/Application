import { Fab, Zoom } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// floating
const FixedFab = styled(({ isActive, ...props }) => (
  <Zoom in={isActive}>
    <Fab {...props} />
  </Zoom>
))({
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
});

// Move Top Fab
const MoveTopFab = styled(({ isActive, onClick, ...props }) => (
  <FixedFab color="primary" isActive={isActive} onClick={onClick} {...props}>
    <ArrowUpwardIcon />
  </FixedFab>
))({});

export { FixedFab, MoveTopFab };

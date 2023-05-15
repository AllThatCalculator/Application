import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { grey } from "@mui/material/colors";

// floating
const FLOATING_TAB_HEIGHT = "3.8rem";
const FloatingTabs = styled((props) => <Tabs {...props} />)({
  alignItems: "center",
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});
const FloatingTab = styled(({ isActive, ...props }) => <Tab {...props} />)(
  ({ theme, isActive }) => ({
    minHeight: FLOATING_TAB_HEIGHT,
    height: FLOATING_TAB_HEIGHT,
    margin: "0.4rem 0.8rem",
    width: "11.2rem",

    color: isActive ? "black" : grey[600],
    "&.Mui-selected": {
      color: isActive ? "black" : grey[600],
    },

    fontWeight: isActive
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightRegular,

    boxShadow: isActive ? theme.shadows[1] : "",
    backgroundColor: isActive ? theme.palette.atcBlue[100] : "",
    borderRadius: "6px",
  })
);

export { FloatingTabs, FloatingTab };

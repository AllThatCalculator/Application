import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { grey } from "@mui/material/colors";

// floating
const FloatingTabs = styled((props) => <Tabs {...props} />)({
  alignItems: "center",
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});
const FloatingTab = styled(({ isActive, ...props }) => <Tab {...props} />)(
  ({ theme, isActive }) => ({
    margin: "0rem 0.8rem",
    width: "10.2rem",

    color: isActive ? theme.palette.primary.main : grey[600],
    "&.Mui-selected": {
      color: isActive ? theme.palette.primary.main : grey[600],
    },

    fontWeight: isActive
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightRegular,

    borderBottom: isActive ? "2px solid" : "",
    borderColor: theme.palette.primary.main,
  })
);

export { FloatingTabs, FloatingTab };

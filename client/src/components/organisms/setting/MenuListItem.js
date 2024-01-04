import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function MenuListItem({ icon = null, title, handleOnClick }) {
  return (
    <>
      <ListItemButton onClick={handleOnClick}>
        {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
        <KeyboardArrowRightIcon />
      </ListItemButton>
      <Divider />
    </>
  );
}
export default MenuListItem;

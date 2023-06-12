import { ListItem, ListItemButton, ListItemText } from "@mui/material";

function StyledListItem({ data }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={data.onClickFuntion}
        sx={{
          paddingY: "1.2rem",
          paddingLeft: "2.0rem",
          paddingRight: "8rem",
        }}
      >
        <ListItemText primary={data.name} sx={{ ml: "1.6rem" }} />
      </ListItemButton>
    </ListItem>
  );
}
export default StyledListItem;

import {
  Divider,
  // IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
// import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import usePage from "../../hooks/usePage";

/**
 * bookmark screen list item component
 * @param {*} param0
 * @returns
 */
function StyledBookmarkListItem({ data }) {
  const { calculetIdPage } = usePage();

  return (
    <>
      <ListItem
        // secondaryAction={
        //   <IconButton edge="end">
        //     <BookmarkRemoveIcon />
        //   </IconButton>
        // }
        disablePadding
      >
        <ListItemButton onClick={() => calculetIdPage(data.id)}>
          <ListItemText primary={data.title} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}
export default StyledBookmarkListItem;

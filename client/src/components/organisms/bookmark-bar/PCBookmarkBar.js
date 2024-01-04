import {
  Box,
  Divider,
  List,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StyledScrollbar from "../../atoms/StyledScrollbar";
import StyledBookmarkListItem from "./StyledBookmarkListItem";
import BookmarkSkeleton from "./BookmarkSkeleton";
import BookmarkLoginNotice from "./BookmarkLoginNotice";
import BookmarkAddNotice from "./BookmarkAddNotice";

function PCBookmarkBar({
  isLoggedIn,
  isLoading,
  contents,
  isActive,
  setIsActive,
}) {
  return (
    <SwipeableDrawer
      anchor="right"
      // variant="permanent"
      // open={true}
      open={isActive}
      onClose={setIsActive(false)}
      onOpen={setIsActive(true)}
      PaperProps={{
        sx: {
          // maxWidth: "360px",
          // minWidth: "360px",
          // mt: "6rem",
          width: "360px",
          zIndex: (theme) => theme.zIndex.AppBar - 1000,
        },
      }}
    >
      <Toolbar
        sx={{
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "grey.100",
          },
          color: "text.secondary",
          gap: "0.8rem",
        }}
        onClick={setIsActive(false)}
      >
        <ChevronRightIcon />
        <Typography>북마크</Typography>
      </Toolbar>
      <Divider />
      <StyledScrollbar>
        <Box sx={{ width: "100%" }}>
          {!isLoggedIn && (
            <BookmarkLoginNotice onClickClose={setIsActive(false)} />
          )}
          {isLoggedIn && (
            <List>
              {isLoading && <BookmarkSkeleton />}
              {
                // no list
                !!contents && contents.length === 0 && !isLoading && (
                  <BookmarkAddNotice />
                )
              }
              {!!contents &&
                !isLoading &&
                contents.map((data, index) => (
                  <StyledBookmarkListItem key={index} data={data} />
                ))}
            </List>
          )}
        </Box>
      </StyledScrollbar>
    </SwipeableDrawer>
  );
}
export default PCBookmarkBar;

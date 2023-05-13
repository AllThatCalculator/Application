import {
  AppBar,
  Dialog,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { TransitionSlide } from "../atom-components/Transitions";
import StyledBookmarkListItem from "./StyledBookmarkListItem";
import BookmarkLoginNotice from "./BookmarkLoginNotice";
import BookmarkSkeleton from "./BookmarkSkeleton";
import BookmarkAddNotice from "./BookmarkAddNotice";

/**
 * bookmark screen
 * @param {*} param0
 * @returns
 */
function BookmarkScreen({ isOpen, setIsOpen, isLoggedIn, isLoading }) {
  // calculetBookmark
  const { bookmark } = useSelector((state) => ({
    bookmark: state.calculetBookmark.bookmark,
  }));

  function handleClickClose() {
    setIsOpen(false);
  }

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClickClose}
      TransitionComponent={TransitionSlide}
      keepMounted
    >
      <AppBar sx={{ position: "relative", width: "100%" }}>
        <Toolbar sx={{ width: "100%" }}>
          {/* 뒤로가기 버튼 */}
          <IconButton edge="start" color="inherit" onClick={handleClickClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">북마크</Typography>
        </Toolbar>
      </AppBar>
      {!isLoggedIn && <BookmarkLoginNotice onClickClose={handleClickClose} />}
      {isLoggedIn && (
        <List>
          {isLoading && <BookmarkSkeleton />}
          {
            // no list
            !!bookmark && bookmark.length === 0 && <BookmarkAddNotice />
          }
          {!isLoading &&
            !!bookmark &&
            bookmark.map((data, index) => (
              <StyledBookmarkListItem key={index} data={data} />
            ))}
        </List>
      )}
    </Dialog>
  );
}
export default BookmarkScreen;

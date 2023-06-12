import { useState } from "react";
import useSx from "../../../hooks/useSx";
import { IconButton, Tooltip } from "@mui/material";
import BookmarkScreen from "./BookmarkScreen";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function MobileBookmarkBar({ isLoggedIn, isLoading }) {
  const { headerIconSizeSx } = useSx();

  // sm down : mobile
  const [isOpen, setIsOpen] = useState(false);
  function handleClickIsOpen() {
    setIsOpen(true);
  }

  return (
    <>
      <Tooltip title="북마크">
        <IconButton sx={{ ...headerIconSizeSx }} onClick={handleClickIsOpen}>
          <BookmarkBorderIcon sx={{ color: "white" }} fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <BookmarkScreen
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
      />
    </>
  );
}
export default MobileBookmarkBar;

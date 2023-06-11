import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import useSx from "../../../hooks/useSx";
import SearchIcon from "@mui/icons-material/Search";
import SearchScreen from "./SearchScreen";
import SearchPopup from "./SearchPopup";

/**
 * 검색창 & 바를 반환하는 함수
 * is Window Md Down ? 돋보기 아이콘 버튼으로 full-screen 검색창
 * is Window Md up   ? 검색바
 */
function SearchBar() {
  const { isWindowMdDown, headerIconSizeSx } = useSx();

  // sm down : 검색창 (Full-Screen)
  const [isSearch, setIsSearch] = useState(false);
  function handleIsSearchOpen() {
    setIsSearch(true);
  }

  return (
    <>
      {isWindowMdDown ? (
        <>
          <Tooltip title="검색">
            <IconButton
              sx={{ ...headerIconSizeSx }}
              onClick={handleIsSearchOpen}
            >
              <SearchIcon sx={{ color: "white" }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <SearchScreen isSearch={isSearch} setIsSearch={setIsSearch} />
        </>
      ) : (
        <SearchPopup />
      )}
    </>
  );
}
export default SearchBar;

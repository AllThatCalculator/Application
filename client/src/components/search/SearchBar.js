import { IconButton } from "@mui/material";
import { useState } from "react";
import useSx from "../../hooks/useSx";
import SearchIcon from "@mui/icons-material/Search";
import SearchScreen from "./SearchScreen";
import SearchPopup from "./SearchPopup";

/**
 * 검색창 & 바를 반환하는 함수
 * is Window Md Down ? 돋보기 아이콘 버튼으로 full-screen 검색창
 * is Window Md up   ? 검색바
 */
function SearchBar() {
  const { isWindowMdDown } = useSx();

  // sm down : 검색창 (Full-Screen)
  const [isSearch, setIsSearch] = useState(false);
  function handleIsSearchOpen() {
    setIsSearch(true);
  }

  const sizeSx = { fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" } };

  return (
    <>
      {isWindowMdDown ? (
        <>
          <IconButton sx={{ ...sizeSx }} onClick={handleIsSearchOpen}>
            <SearchIcon sx={{ color: "white", ...sizeSx }} fontSize="inherit" />
          </IconButton>
          <SearchScreen isSearch={isSearch} setIsSearch={setIsSearch} />
        </>
      ) : (
        <SearchPopup />
      )}
    </>
  );
}
export default SearchBar;

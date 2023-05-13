import { AppBar, Dialog, IconButton, List, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BoxSearchInput from "../atom-components/BoxSearchInput";
import { useSelector } from "react-redux";
import StyledResultListItem from "./StyledResultListItem";
import { TransitionSlide } from "../atom-components/Transitions";

function SearchScreen({ isSearch, setIsSearch }) {
  const { resultPreviewList } = useSelector((state) => ({
    resultPreviewList: state.search.resultPreviewList,
  }));

  function handleIsSearchClose() {
    setIsSearch(false);
  }

  return (
    <Dialog
      fullScreen
      open={isSearch}
      onClose={handleIsSearchClose}
      TransitionComponent={TransitionSlide}
      keepMounted
    >
      <AppBar sx={{ position: "relative", width: "100%" }}>
        <Toolbar sx={{ width: "100%" }}>
          {/* 뒤로가기 버튼 */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleIsSearchClose}
          >
            <ArrowBackIcon />
          </IconButton>
          {/* 검색창 */}
          <BoxSearchInput onIsSearchClose={handleIsSearchClose} />
        </Toolbar>
      </AppBar>
      <List>
        {resultPreviewList.map((data) => (
          <StyledResultListItem key={data.id} data={data} />
        ))}
      </List>
    </Dialog>
  );
}
export default SearchScreen;

import { Box, ClickAwayListener, Paper } from "@mui/material";
import { useState } from "react";
import BoxSearchInput from "../common/BoxSearchInput";
import { useSelector } from "react-redux";
import useSx from "../../../hooks/useSx";
import StyledResultListItem from "./StyledResultListItem";

/**
 * md up 에서 보여지는 계산기 검색바 => 결과 미리보기 popup
 */
function SearchPopup() {
  const { popupLayoutSx, popupContentSx } = useSx();

  const { resultPreviewList } = useSelector((state) => ({
    resultPreviewList: state.search.resultPreviewList,
  }));

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  function handleOffIsPopUpOpen() {
    setIsPopUpOpen(false);
  }

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleOffIsPopUpOpen}
    >
      <Box
        // 검색창 다른 곳 클릭 시, 검색popup 꺼짐
        onFocus={() => setIsPopUpOpen(true)}
      >
        <BoxSearchInput />
        <Paper sx={{ ...popupLayoutSx, width: "44.8rem" }} elevation={3}>
          <Box sx={popupContentSx}>
            {isPopUpOpen &&
              resultPreviewList.map((data) => (
                <StyledResultListItem key={data.id} data={data} />
              ))}
          </Box>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
}
export default SearchPopup;

import {
  Box,
  ClickAwayListener,
  Dialog,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import useSx from "../../../hooks/useSx";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 * 계산 내역 Selected option list
 *
 * @param {string, funtion}
 * isPopUpOpen : popup state
 * setIsPopUpOpen : popup state 변경하는 함수
 */
function RecordSelectedOption({
  isPopUpOpen,
  setIsPopUpOpen,
  clickFunctionList,
}) {
  const { onSelectAllClick, onSelectRecentClick, onSelectRecordClick } =
    clickFunctionList;

  const { isWindowSmDown, popupLayoutSx, popupContentSx } = useSx();

  function handleOnIsPopUpOpen() {
    setIsPopUpOpen(true);
  }
  function handleOffIsPopUpOpen() {
    setIsPopUpOpen(false);
  }

  function handleSelectAllClick() {
    handleOffIsPopUpOpen();
    onSelectAllClick();
  }
  function handleSelectRecentClick() {
    handleOffIsPopUpOpen();
    onSelectRecentClick();
  }

  function handleSelectRecordClick() {
    handleOffIsPopUpOpen();
    onSelectRecordClick();
  }

  /** 선택 목록 */
  const listData = [
    {
      name: "전체 선택",
      onClickFuntion: handleSelectAllClick,
    },
    {
      name: "최근 계산 내역",
      onClickFuntion: handleSelectRecentClick,
    },
    {
      name: "과거 계산 내역",
      onClickFuntion: handleSelectRecordClick,
    },
  ];

  /** list component */
  const StyledListItem = ({ data }) => {
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
  };

  const compontList = (
    <>
      {listData.map((data) => (
        <StyledListItem key={data.name} data={data} />
      ))}
    </>
  );

  /** sm down에서의 popup 컴포넌트 */
  const SmPopup = () => {
    return (
      <Dialog onClose={handleOffIsPopUpOpen} open={isPopUpOpen}>
        {compontList}
      </Dialog>
    );
  };
  /** md up에서의 popup 컴포넌트 */
  const MdPopup = () => {
    return (
      <Paper sx={popupLayoutSx} elevation={3}>
        <Box sx={popupContentSx}>{compontList}</Box>
      </Paper>
    );
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleOffIsPopUpOpen}
    >
      <Box>
        {isWindowSmDown ? <SmPopup /> : isPopUpOpen ? <MdPopup /> : null}
        <IconButton
          onClick={handleOnIsPopUpOpen}
          size="small"
          sx={{ width: 16, height: 16 }}
        >
          <ArrowDropDownIcon fontSize="small" />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}
export default RecordSelectedOption;

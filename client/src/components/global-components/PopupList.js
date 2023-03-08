import * as React from "react";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Drawer,
  Tooltip,
  Menu,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useSx from "../../hooks/useSx";

/**
 * 헤더에 있는 팝업창 리스트 컴포넌트
 * @param {component} popupIcon : 버튼 아이콘
 * @param {string} popupTitle : 팝업창 제목 & 호버 시 text
 * @param {2D array} popupListData : 팝업 리스트 데이터 (2차원 배열)
 * @param {component} popupContent : 리스트 외, 팝업에 넣을 컴포넌트, 버튼이 아니니까 따로 받음 (기본값 : null)
 */
function PopupList({
  popupIcon,
  popupTitle,
  popupListData,
  popupContent = null,
}) {
  /** window is sm down? */
  const { isWindowSmDown } = useSx();

  /** 팝업 버튼 */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popUpOpen = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose(event) {
    // 탭으로 네비게이션 가능
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAnchorEl(null);
  }
  function handleClickAway() {
    setAnchorEl(null);
  }

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
          {data.icon}
          <ListItemText primary={data.name} sx={{ ml: "1.6rem" }} />
        </ListItemButton>
      </ListItem>
    );
  };

  const compontList = (
    <>
      {popupListData.map((listData, index) => (
        <div key={index}>
          {listData.map((data) => (
            <StyledListItem key={data.name} data={data} />
          ))}
          {index < popupListData.length - 1 && <Divider />}
        </div>
      ))}
    </>
  );

  // 팝업 제목 컴포넌트
  const componentTitle = (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          p: "0.8rem 1.6rem",
          alignItems: "center",
          typography: "subtitle1",
          fontWeight: "bold",
        }}
      >
        {popupTitle}
      </Box>
      <Divider />
    </>
  );

  /** sm down에서의 popup 컴포넌트 */
  const SmPopup = () => {
    return (
      <Drawer
        anchor="bottom"
        open={popUpOpen}
        onClose={handleClose}
        sx={{ zIndex: 2000 }}
      >
        <Box>
          {componentTitle}
          {popupContent}
          <Box onClick={handleClose} onKeyDown={handleClose}>
            {compontList}
          </Box>
        </Box>
      </Drawer>
    );
  };

  /** md up에서의 popup 컴포넌트 */
  const MdPopup = () => {
    return (
      <Menu anchorEl={anchorEl} open={popUpOpen} onClose={handleClose}>
        <Box>
          {componentTitle}
          {popupContent}
          <Box onClick={handleClose} onKeyDown={handleClose}>
            {compontList}
          </Box>
        </Box>
      </Menu>
    );
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box>
        <Tooltip title={popupTitle}>
          <IconButton
            type="button"
            onClick={handleClick}
            edge="start"
            color="primary"
          >
            {popupIcon}
          </IconButton>
        </Tooltip>
        {isWindowSmDown && popUpOpen ? <SmPopup /> : null}
        {!isWindowSmDown && popUpOpen ? <MdPopup /> : null}
      </Box>
    </ClickAwayListener>
  );
}
export default PopupList;

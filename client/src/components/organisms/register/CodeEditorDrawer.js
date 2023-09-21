import { Paper } from "@mui/material";
import {
  HEIGHT_COMP_EDITOR,
  MAX_HEIGHT_COMP_EDITOR,
  MIN_HEIGHT_COMP_EDITOR,
  PLAYGROUND_WIDTH,
} from "../../../constants/register";
import { useEffect, useState } from "react";
import DrawerDragHandler from "../common/DrawerDragHandler";

/**
 * resizing 가능한 drawer
 */
function CodeEditorDrawer({ children, setPlaygroundHeight }) {
  const minDrawerHeight = MIN_HEIGHT_COMP_EDITOR;
  const maxDrawerHeight = MAX_HEIGHT_COMP_EDITOR;

  // MIN_HEIGHT_COMP_EDITOR,MAX_HEIGHT_COMP_EDITOR,
  const [drawerHeight, setDrawerHeight] = useState(HEIGHT_COMP_EDITOR);

  // local storage drawerKey
  const drawerKey = "register-code-editor-drawer-height";
  function getLocalStorageDrawerManage(drawerKey) {
    const height = localStorage.getItem(drawerKey);
    if (height === null) return HEIGHT_COMP_EDITOR;
    return height;
  }
  function setLocalStorageDrawerManage() {
    localStorage.setItem(drawerKey, drawerHeight);
  }

  // deltaY에 따른 계산
  function handleDrawerHeight(deltaY) {
    // -- height 계산 --
    let height = drawerHeight - deltaY;

    // 최대, 최소 Height 제한
    if (height >= maxDrawerHeight) height = maxDrawerHeight;
    else if (height <= minDrawerHeight) height = minDrawerHeight;

    setDrawerHeight(height);
    setPlaygroundHeight(`calc(79vh - ${height}px)`);
  }

  // init height
  useEffect(() => {
    // wait until mount page at client
    if (typeof window === "undefined") return;

    // perform localStorage action
    const drawerHeight = getLocalStorageDrawerManage(drawerKey);
    if (drawerHeight !== null) {
      setDrawerHeight(Number(drawerHeight));
      setPlaygroundHeight(`calc(79vh - ${Number(drawerHeight)}px)`);
    }
  }, []);

  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        width: PLAYGROUND_WIDTH,
        height: drawerHeight,
      }}
    >
      <DrawerDragHandler
        onMouseDown={handleDrawerHeight}
        onMouseUp={setLocalStorageDrawerManage}
      />
      {children}
    </Paper>
  );
}
export default CodeEditorDrawer;

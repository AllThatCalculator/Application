import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DrawerDragHandler from "../common/DrawerDragHandler";
import {
  HEIGHT_CODE_EDITOR,
  MAX_HEIGHT_CODE_EDITOR,
  MIN_HEIGHT_CODE_EDITOR,
  PLAYGROUND_WIDTH,
} from "../../../constants/register";

/**
 * resizing 가능한 drawer
 */
function CodeEditorDrawer({ children }) {
  const minDrawerHeight = MIN_HEIGHT_CODE_EDITOR;
  const maxDrawerHeight = MAX_HEIGHT_CODE_EDITOR;

  // MIN_HEIGHT_CODE_EDITOR,MAX_HEIGHT_CODE_EDITOR,
  const [drawerHeight, setDrawerHeight] = useState(HEIGHT_CODE_EDITOR);

  // local storage drawerKey
  const DRAWER_KEY = "register-code-editor-drawer-height";
  function getLocalStorageDrawerManage(DRAWER_KEY) {
    const height = localStorage.getItem(DRAWER_KEY);
    if (height === null) return HEIGHT_CODE_EDITOR;
    return height;
  }
  function setLocalStorageDrawerManage() {
    localStorage.setItem(DRAWER_KEY, drawerHeight);
  }

  // deltaY에 따른 계산
  function handleDrawerHeight(deltaY) {
    // -- height 계산 --
    let height = drawerHeight - deltaY;

    // 최대, 최소 Height 제한
    if (height >= maxDrawerHeight) height = maxDrawerHeight;
    else if (height <= minDrawerHeight) height = minDrawerHeight;

    setDrawerHeight(height);
  }

  // init height
  useEffect(() => {
    // wait until mount page at client
    if (typeof window === "undefined") return;

    // perform localStorage action
    const drawerHeight = getLocalStorageDrawerManage(DRAWER_KEY);
    if (drawerHeight !== null) {
      setDrawerHeight(Number(drawerHeight));
    }
  }, []);

  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        width: PLAYGROUND_WIDTH,
        height: drawerHeight,
        minHeight: minDrawerHeight,
        maxHeight: maxDrawerHeight,
        pb: 10,
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

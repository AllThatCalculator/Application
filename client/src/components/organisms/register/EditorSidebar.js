import { Box, Divider, Drawer, TextField, Toolbar } from "@mui/material";
import { FlexColumnBox } from "../common/FlexBox";
import SubTitle from "../common/SubTitle";
import {
  EDITOR_HEIGHT_MAX,
  EDITOR_HEIGHT_MIN,
} from "../../../constants/register";
import StyledScrollbar from "../../atoms/StyledScrollbar";
import EditorComponent from "./EditorComponent";

const drawerWidth = 420;

/**
 * 에디터 편집창 사이드바
 * - 편집창 높이 설정
 * - 컴포넌트 제공
 * @param {*} param0
 * @returns
 */
function EditorSidebar({
  editorRowCount,
  onChangeEditorRowCount,
  editorComponentList,
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        zIndex: (theme) => theme.zIndex.appBar - 2,
      }}
    >
      <Toolbar />
      <Toolbar />
      <FlexColumnBox sx={{ p: 2, gap: 2 }}>
        <SubTitle
          content="편집창 높이 설정"
          subContent="편집창 높이를 설정해주세요."
        />
        <TextField
          type="number"
          value={editorRowCount}
          onChange={onChangeEditorRowCount}
          InputProps={{
            inputProps: {
              max: EDITOR_HEIGHT_MAX,
              min: EDITOR_HEIGHT_MIN,
            },
          }}
        />
      </FlexColumnBox>
      <Divider />
      <StyledScrollbar>
        <Box sx={{ width: "100%", p: 2 }}>
          <SubTitle
            content="컴포넌트"
            subContent="제공하는 컴포넌트들을 드래그하여 편집창에서 조합해주세요."
          />
          {editorComponentList.map((editorComponent, index) => {
            const { component: Component, id } = editorComponent;

            if (!Component) return <></>;
            return (
              <EditorComponent key={index} _id={id} component={Component}>
                <Component />
              </EditorComponent>
            );
          })}
        </Box>
      </StyledScrollbar>
    </Drawer>
  );
}

export default EditorSidebar;

import { useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CALCULET_BUTTON } from "../../../constants/calculetComponent";
import { EDITOR_ITEM_TYPES } from "../../../constants/register";
import StyledScrollbar from "../../atoms/StyledScrollbar";
import Transformer from "../register-editor/Transformer";
import EditorComponent from "./EditorComponent";
import editorComponentList from "./components";
import SubTitle from "../common/SubTitle";

function DragComponent({ componentType, props }) {
  const [, drag] = useDrag(() => ({
    type: EDITOR_ITEM_TYPES.EDITOR,
    item: { componentType: componentType },
  }));

  return (
    <div ref={drag}>
      <EditorComponent
        componentType={componentType}
        tooltip={`드래그해서 옮기기`}
      >
        <Transformer data={props} />
      </EditorComponent>
    </div>
  );
}

/**
 * - 접은 후, 컴포넌트 숨기거나 펼친 후, 컴포넌트 제공
 * ex) 입력창
 *     날짜 선택기
 *     주소
 * @param {*} param0
 */
function ListComponent({ open, components }) {
  const { components: userEditorComp } = useSelector(
    (state) => state.calculetEditor
  );

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List
        sx={{
          p: 2,
          backgroundColor: "atcBlue.100",
          boxShadow: (theme) => theme.shadows[11],
        }}
      >
        {components.map((props) => {
          const { name, componentType, width } = props;

          // 예외) 계산하기 버튼 1개 존재할 시, 컴포넌트 제공 x
          const isExistCalculetButton =
            componentType === CALCULET_BUTTON &&
            Object.values(userEditorComp).findIndex(
              (value) => value.componentType === CALCULET_BUTTON
            ) !== -1;

          if (isExistCalculetButton) return <div key={name} />;
          return (
            <div key={name}>
              <Typography variant="body2" color="text.secondary">
                {name}
              </Typography>
              <Paper elevation={1} sx={{ p: 1.2, my: 0.8, width: width }}>
                <DragComponent componentType={componentType} props={props} />
              </Paper>
            </div>
          );
        })}
      </List>
    </Collapse>
  );
}

/**
 * 각 제공하는 컴포넌트
 * ex) 글자 입력창
 *     ㄴ 입력창
 *     ㄴ 날짜 선택기
 *     ㄴ 주소
 * @param {*} param0
 */
function ListRowBox({ title, help, components }) {
  const [open, setOpen] = useState(true);
  function onClickOpen() {
    setOpen((pre) => !pre);
  }

  return (
    <div>
      <ListItemButton onClick={onClickOpen}>
        {open ? (
          <KeyboardArrowDownIcon />
        ) : (
          <KeyboardArrowRightIcon color="disabled" />
        )}
        <ListItemText primary={title} sx={{ mx: 0.8 }} />
        {
          // 예외) 계산하기 버튼 필수 추가
          !!help && (
            <Tooltip title={help}>
              <Typography color="warning.main">*</Typography>
            </Tooltip>
          )
        }
      </ListItemButton>
      <ListComponent open={open} components={components} />
    </div>
  );
}

/**
 * 에디터 편집창 사이드바
 * - 편집창 높이 설정
 * - 컴포넌트 제공
 * @param {*} param0
 * @returns
 */
function EditorSidebar({ drawerWidth }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          paddingBottom: 7,
        },
        zIndex: (theme) => theme.zIndex.appBar - 1100,
        paddingBottom: 7,
      }}
    >
      <Toolbar />
      <Toolbar />
      <StyledScrollbar>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", p: 2 }}>
            <SubTitle
              content="컴포넌트"
              subContent="제공하는 컴포넌트들을 드래그하여 편집창에서 조합해주세요."
            />
          </Box>
          <List component="nav">
            {Object.entries(editorComponentList).map(([type, comp], index) => {
              const { title, help, components } = comp;
              return (
                <ListRowBox
                  key={type}
                  title={title}
                  help={help}
                  components={components}
                />
              );
            })}
          </List>
        </Box>
      </StyledScrollbar>
    </Drawer>
  );
}

export default EditorSidebar;

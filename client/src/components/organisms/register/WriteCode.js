import { useState } from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
  Alert,
  Paper,
  IconButton,
  Tooltip,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  TextField,
  Checkbox,
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "../common/FlexBox";
import useSx from "../../../hooks/useSx";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeEditor from "./CodeEditor";
import CustomPanel from "./CustomPanel";
import StyledScrollbar from "../../atoms/StyledScrollbar";
import SubTitle from "../common/SubTitle";
import {
  EDITOR_HEIGHT_MAX,
  EDITOR_HEIGHT_MIN,
} from "../../../constants/register";
import EditorComponent from "./EditorComponent";
import EditorSidebar from "./EditorSidebar";
import EditorContent from "./EditorContent";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";

/**
 * 언어 도움말
 * @param {string} language : 지원 언어
 * @param {string} helpText : 도움말
 */
function LanguageHelp({ language, helpText }) {
  return (
    <FlexBox gap="0.8rem" sx={{ alignItems: "center", m: "0.8rem 0" }}>
      <Tooltip title={helpText}>
        <IconButton disableRipple color="info">
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="subtitle1">Language</Typography>
      <Paper
        variant="outlined"
        sx={{
          p: "0.2rem 0.6rem",
          minWidth: "16rem",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          MsUserSelect: "none",
          userSelect: "none",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", pointerEvents: "none" }}
        >
          {language}
        </Typography>
      </Paper>
    </FlexBox>
  );
}

/**
 * 계산기 코드 작성 컴포넌트
 * - HTML, MARKDOWN, 미리 보기
 * @param {*} props
 * - handleIsPreview : 미리 보기 컨트롤 함수
 */
function WriteCode(props) {
  // editor row count : height
  const [editorRowCount, setEditorRowCount] = useState(1);
  function onChangeEditorRowCount(event) {
    setEditorRowCount(Number(event.target.value));
  }

  const [userData, setUserData] = useState({});
  const changeHandler = (index, data) => {
    // console.log("changeHandler >>", data);
    setUserData({ ...userData, [index]: [...data] });
  };

  const editorComponentList = [
    { id: "textField", component: TextField },
    { id: "checkbox", component: Checkbox },
  ];

  return (
    <FlexBox>
      <CssBaseline />
      <EditorSidebar
        editorRowCount={editorRowCount}
        onChangeEditorRowCount={onChangeEditorRowCount}
        editorComponentList={editorComponentList}
      />
      {/* <Box
        component="main"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
      </Box> */}
      <StyledScrollbar>
        <Box sx={{ width: "100%", flexGrow: 1 }}>
          <SubTitle content="편집창" />
          <Paper elevation={10} sx={{ m: 2 }}>
            <div style={{ height: "100%" }}>
              <FlexColumnBox gap={1}>
                {[...Array(editorRowCount)].map((_, index) => {
                  return (
                    <EditorContent
                      key={index}
                      change={(data) => {
                        changeHandler(index, data);
                      }}
                    />
                  );
                })}
              </FlexColumnBox>
            </div>
          </Paper>
        </Box>
      </StyledScrollbar>
    </FlexBox>
  );
}

export default WriteCode;
{
  /* <FlexColumnBox sx={{ width: "100%" }}>
            <FlexBox
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <FlexBox sx={{ height: HEIGHT_CODE_EDITOR }}>
                    <CodeEditor
                      defaultLanguage="html"
                      defaultValue={props.srcCode}
                      setData={props.setSrcCode}
                    />
                  </FlexBox>
                </Grid>
                <Grid item xs={4}>
                  <CustomPanel />
                </Grid>
              </Grid>
            </FlexBox>
          </FlexColumnBox> */
}

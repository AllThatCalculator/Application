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
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "../common/FlexBox";
import useSx from "../../../hooks/useSx";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeEditor from "./CodeEditor";
import CustomPanel from "./CustomPanel";

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
  const { HEIGHT_CODE_EDITOR, subTitleSx, isWindowSmDown } = useSx();

  return (
    <Grid container spacing={4}>
      <Grid item sx={{ width: "100%" }}>
        <FlexColumnBox gap="1.6rem" sx={{ width: "100%" }}>
          <Typography sx={{ ...subTitleSx }}>계산기 코드 입력</Typography>
          <FlexColumnBox sx={{ width: "100%" }}>
            <FlexBox
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                {/* 열 너비(각 차지하는 열 수) : 1 ~ 12 */}
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
          </FlexColumnBox>
        </FlexColumnBox>
      </Grid>
    </Grid>
  );
}

export default WriteCode;

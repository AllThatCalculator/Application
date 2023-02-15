import { useRef } from "react";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useSnackbar from "../../hooks/useSnackbar";

/**
 * 클래스 네임에 대한 설명, 예시 디자인, 코드 복사기가 모여있는 컴포넌트
 * @param {string, boolean, string, string, string}
 * text: 이름
 * classCode: css 클래스 이름, 코드 텍스트
 */
function OneBoxClassName({ text, classCode }) {
  const classNameRef = useRef(null);
  const { openSnackbar } = useSnackbar();

  async function handleCopyClipBoard() {
    try {
      await navigator.clipboard.writeText(classNameRef.current.innerText);
      openSnackbar(
        "basic",
        "복사되었습니다.",
        false,
        "bottom",
        "left",
        1600 // 지속시간
      );
    } catch (error) {
      openSnackbar(
        "basic",
        "다시 시도해주세요.",
        false,
        "bottom",
        "left",
        1600 // 지속시간
      );
    }
  }

  return (
    <Grid
      container
      spacing={4}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      {/* 열 너비(각 차지하는 열 수) : 1 ~ 12 */}
      <Grid item xs={2.5}>
        <Typography
          variant="overline"
          color="info.main"
          sx={{ fontWeight: "bold" }}
        >
          {text}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <FlexBox
          sx={{
            alignItems: "center",
            padding: "0.4rem 0.8rem",
            backgroundColor: "atcBlue.100",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
            position: "relative",
          }}
        >
          {classCode && (
            <Typography ref={classNameRef} variant="caption">
              {classCode}
            </Typography>
          )}
          <Box sx={{ position: "absolute", right: "0.4rem" }}>
            <IconButton size="small" onClick={() => handleCopyClipBoard()}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </FlexBox>
      </Grid>
    </Grid>
  );
}

/**
 * OneBoxClassName 컴포넌트의 배열 컴포넌트
 * @param {array}
 * designs: {text, existDesign, classCode} 으로 이루어진 디자인들 배열
 */
function BoxClassName({ designs }) {
  return (
    <>
      {designs.map((design, index) => (
        <FlexColumnBox key={index} gap="1.2rem">
          <OneBoxClassName text={design.text} classCode={design.classCode} />
          {design.existDesign && (
            <FlexColumnBox gap="1.2rem">
              <FlexBox>
                <div className={design.classCode}>예시</div>
              </FlexBox>
              <Divider />
            </FlexColumnBox>
          )}
        </FlexColumnBox>
      ))}
    </>
  );
}

export default BoxClassName;

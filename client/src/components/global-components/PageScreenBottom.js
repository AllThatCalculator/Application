import { Grid, Paper, Typography } from "@mui/material";
import { MainButton } from "../atom-components/Buttons";
import { PageScreenBox } from "./PageScreenBox";

/**
 * 페이지 바닥 패널 컴포넌트
 * @param {*} helpText : 버튼 옆 설명
 * @param {*} buttonText : 버튼 내용
 * @param {*} handleButton : 버튼 핸들러
 * @param {*} buttonIcon : 버튼 아이콘 (생략 가능)
 */
function PageScreenBottom({
  helpText,
  buttonText,
  handleButton,
  buttonIcon = null,
}) {
  return (
    <Paper elevation={5} sx={{ width: "100%" }}>
      <Grid container sx={{ backgroundColor: "atcBlue.100" }}>
        <PageScreenBox
          sx={{
            width: 1,
            pt: "1.2rem",
            pb: "1.2rem",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1.6rem",
            }}
          >
            <Grid item>
              <Typography color="grey.600">{helpText}</Typography>
            </Grid>
            <Grid item>
              <MainButton
                variant="contained"
                startIcon={buttonIcon}
                onClick={handleButton}
              >
                {buttonText}
              </MainButton>
            </Grid>
          </Grid>
        </PageScreenBox>
      </Grid>
    </Paper>
  );
}
export default PageScreenBottom;

import { Button, Grid, Paper, Typography } from "@mui/material";
import { MainButton } from "./Buttons";
import { PageScreenBox } from "./PageScreenBox";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FlexBox } from "./FlexBox";
function PageScreenBottom({ children }) {
  return (
    <Paper elevation={5} sx={{ width: "100%" }}>
      <Grid container sx={{ backgroundColor: "atcBlue.100" }}>
        {children}
      </Grid>
    </Paper>
  );
}

/**
 * Calculet 페이지 바닥 패널 컴포넌트
 * @param {*} helpText : 버튼 옆 설명
 * @param {*} buttonText : 버튼 내용
 * @param {*} handleButton : 버튼 핸들러
 * @param {*} buttonIcon : 버튼 아이콘 (생략 가능)
 */
function CalculetPageScreenBottom({
  helpText,
  buttonText,
  handleButton,
  buttonIcon = null,
}) {
  return (
    <PageScreenBottom>
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
    </PageScreenBottom>
  );
}

/**
 * Register 페이지 바닥 패널 컴포넌트
 */
function RegisterPageScreenBottom({ onClickLeftButton, onClickRightButton }) {
  return (
    <PageScreenBottom>
      <FlexBox
        sx={{
          width: 1,
          px: 8,
          py: 1.2,
          justifyContent: "space-between",
          // alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<KeyboardArrowLeftIcon />}
          onClick={onClickLeftButton}
        >
          이전
        </Button>
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={onClickRightButton}
        >
          다음
        </Button>
      </FlexBox>
    </PageScreenBottom>
  );
}

export { CalculetPageScreenBottom, RegisterPageScreenBottom };

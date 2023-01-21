import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

/** page 제일 바깥 스크린 크기 레이아웃 */
const PageScreenBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0 auto",
  padding: "2.4rem 0",
  maxWidth: 1128,
  width: "100%",
}));

/**
 * page 제일 바깥 스크린 크기 레이아웃 (흰 배경)
 * ex. 로그인, 회원 가입
 */
const PageWhiteScreenBox = styled(Grid)(({ theme }) => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  backgroundColor: "white",
}));

export { PageScreenBox, PageWhiteScreenBox };

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

/** page 제일 바깥 스크린 크기 레이아웃 */
const PageScreenBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0 auto",
  pt: "8.0rem",

  maxWidth: 1128,
}));
export default PageScreenBox;

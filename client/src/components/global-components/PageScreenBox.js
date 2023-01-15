import { Box } from "@mui/material";
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
export default PageScreenBox;

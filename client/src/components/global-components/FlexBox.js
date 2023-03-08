import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

/** flex box */
const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
}));
/** column flex box */
const FlexColumnBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export { FlexBox, FlexColumnBox };

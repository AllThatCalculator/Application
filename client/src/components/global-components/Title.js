import { Divider, Typography } from "@mui/material";
import { FlexBox } from "./FlexBox";

/**
 * 제목 컴포넌트
 * @param {string} content : 제목 text
 */
function Title({ content }) {
  const color = "primary.main";

  return (
    <FlexBox sx={{ minHeight: "4rem", alignItems: "center" }}>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          color: color,
          borderColor: color,
          backgroundColor: color,
          border: 2,
          mr: "1.2rem",
        }}
      />
      <Typography
        variant="h6"
        color="primary"
        sx={{
          fontWeight: "bold",
        }}
      >
        {content}
      </Typography>
    </FlexBox>
  );
}
export default Title;

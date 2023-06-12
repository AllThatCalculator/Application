import { Divider, IconButton, Typography } from "@mui/material";
import { FlexBox } from "./FlexBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * 제목 컴포넌트
 * @param {string} content : 제목 text
 */
function Title({ content, isPage = false, onClickPage = () => {} }) {
  const color = "primary.main";

  return (
    <FlexBox sx={{ minHeight: "4rem", alignItems: "center" }}>
      {isPage ? (
        <IconButton onClick={onClickPage} color="primary">
          <ArrowBackIcon />
        </IconButton>
      ) : (
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
      )}

      <Typography
        variant="h5"
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

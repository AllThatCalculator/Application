import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

function BoxNoItem() {
  return (
    <Typography variant="body2" sx={{ color: grey[400] }}>
      존재하지 않습니다.
    </Typography>
  );
}
export default BoxNoItem;

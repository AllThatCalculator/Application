import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const TagChip = styled(({ color, ...props }) => (
  <Chip {...props} sx={{ color: color }} />
))(({ theme }) => ({ padding: "1.4rem 0.6rem" }));

export { TagChip };

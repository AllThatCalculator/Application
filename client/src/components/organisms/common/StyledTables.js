import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

const FitTableCell = styled(({ isBold, ...props }) => (
  <TableCell component="th" scope="row" {...props} />
))(({ theme, isBold }) => ({
  padding: "1.4rem 1.6rem",
  fontWeight: isBold && "bold",
}));

export { FitTableCell };

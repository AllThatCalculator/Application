import { Box, Paper } from "@mui/material";
import useSx from "../../hooks/useSx";
import StyledListItem from "./StyledListItem";

/**
 *
 * @param {Array} listData : popup list data
 */
function PaperPopup({ listData }) {
  const { popupLayoutSx, popupContentSx } = useSx();

  return (
    <Paper sx={popupLayoutSx} elevation={3}>
      <Box sx={popupContentSx}>
        {listData.map((data) => (
          <StyledListItem key={data.name} data={data} />
        ))}
      </Box>
    </Paper>
  );
}
export default PaperPopup;

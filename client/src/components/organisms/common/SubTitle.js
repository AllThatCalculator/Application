import { Typography } from "@mui/material";
import useSx from "../../../hooks/useSx";
import { FlexColumnBox } from "./FlexBox";

/**
 * 부제목
 * @param {} param0
 * @returns
 */
function SubTitle({ content = "", subContent = "" }) {
  const { subTitleSx } = useSx();

  return (
    <FlexColumnBox>
      <Typography component="div" sx={{ ...subTitleSx }}>
        {content}
      </Typography>
      {subContent && (
        <Typography variant="body2" color="text.disabled">
          {subContent}
        </Typography>
      )}
    </FlexColumnBox>
  );
}
export default SubTitle;

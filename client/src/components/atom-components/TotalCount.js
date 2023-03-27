import { Typography } from "@mui/material";
import { FlexBox } from "../global-components/FlexBox";

/**
 * 전체 length건 컴포넌트 리턴
 * @param {int} length : 건수
 */
function TotalCount({ length }) {
  return (
    <FlexBox sx={{ width: "8rem" }}>
      <Typography variant="body1">전체</Typography>
      <Typography variant="body1" color="info.main">
        {` ${length} `}
      </Typography>
      <Typography variant="body1">건</Typography>
    </FlexBox>
  );
}
export default TotalCount;

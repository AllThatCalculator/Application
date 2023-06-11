import { TextField, Typography } from "@mui/material";
import { FlexColumnBox } from "../common/FlexBox";
import useSx from "../../../hooks/useSx";
import { ID_INPUT_UPDATE } from "../../../constants/register";

/**
 * 업데이트 내용 작성
 * @param {*} param0
 * @returns
 */
function WriteUpdate({ value, onChange }) {
  const { subTitleSx } = useSx();

  return (
    <FlexColumnBox gap="1.6rem" sx={{ width: "100%" }}>
      <Typography sx={{ ...subTitleSx }}>업데이트 내용 입력</Typography>
      <TextField id={ID_INPUT_UPDATE} value={value} onChange={onChange} />
    </FlexColumnBox>
  );
}

export default WriteUpdate;

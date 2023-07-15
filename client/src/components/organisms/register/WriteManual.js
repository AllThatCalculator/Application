import { Typography } from "@mui/material";
import { FlexColumnBox } from "../common/FlexBox";
import MyCKEditor from "../common/MyCKEditor";
import useSx from "../../../hooks/useSx";

/**
 * 계산기 설명 작성 컴포넌트
 */
function WriteManual({ data, onChange }) {
  const { subTitleSx } = useSx();

  return (
    <FlexColumnBox gap="1.6rem">
      <Typography sx={{ ...subTitleSx }}>계산기 세부 설명 입력</Typography>
      <MyCKEditor
        data={data}
        onChange={onChange}
        placeholder="계산기에 대한 설명 및 사용법을 입력해주세요."
        initHeight="200px"
      />
    </FlexColumnBox>
  );
}

export default WriteManual;

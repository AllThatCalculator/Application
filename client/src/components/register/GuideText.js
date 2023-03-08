import { Typography } from "@mui/material";
import { FlexBox } from "../global-components/FlexBox";

/**
 * 디자인 패널의 역할과 사용법을 가이드하는 텍스트 컴포넌트
 * @param {string}
 * content: 가이드 텍스트
 */
function GuideText({ content }) {
  return (
    <FlexBox
      sx={{
        whiteSpace: "pre-line",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {content}
      </Typography>
    </FlexBox>
  );
}

export default GuideText;

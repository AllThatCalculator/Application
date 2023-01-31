import StyledScrollbar from "../atom-components/StyledScrollbar";
import BoxClassName from "./BoxClassName";
import { Design, InputOutput } from "./Designs";
import { GUIDES } from "./constants";
import GuideText from "./GuideText";
import { FlexColumnBox } from "../global-components/FlexBox";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * 기본 커스텀 패널 컴포넌트
 * @param {string, array}
 * guide: 패널에 대한 설명
 * designs: BoxClassName에 대한 정보 배열
 */
function DefaultCustomPanel({ guide, designs }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={4}>
      <CardHeader
        avatar={<ReportIcon />}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandMoreIcon
              sx={{ color: (theme) => theme.palette.atcOrange[100] }}
            />
          </ExpandMore>
        }
        title="필수 절차입니다."
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <GuideText content={guide} />
          <BoxClassName designs={designs} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

/**
 * 스크롤 되는 커스텀 패널 컴포넌트
 * @param {string, array}
 * guide: 패널에 대한 설명
 * designs: BoxClassName에 대한 정보 배열
 */
function ScrollCustomPanel({ guide, designs }) {
  return (
    <FlexColumnBox sx={{ width: "100%", height: "300px" }}>
      <StyledScrollbar>
        <DefaultCustomPanel guide={guide} designs={designs} />
      </StyledScrollbar>
    </FlexColumnBox>
  );
}

function CustomPanel() {
  return (
    <>
      <DefaultCustomPanel guide={GUIDES["InputOutput"]} designs={InputOutput} />
      <ScrollCustomPanel guide={GUIDES["Design"]} designs={Design} />
    </>
  );
}

export { DefaultCustomPanel, CustomPanel };

// import styled from "styled-components";
// import StyledScrollbar from "../atom-components/StyledScrollbar";
// import { FlexColumnLayout } from "../Layout";
// import BoxClassName from "./BoxClassName";
// import { Design, InputOutput } from "./Designs";
// import { GUIDES } from "./constants";
// import GuideText from "./GuideText";

// /**
//  * 패널을 감싸는 최상위 컴포넌트 스타일 정의
//  */
// const Wrapper = styled(FlexColumnLayout)`
//   width: 100%;
// `;

// /**
//  * 스크롤 있는 패널 스타일 정의
//  */
// const ScrollWrapper = styled(StyledScrollbar)`
//   height: 300px;
// `;

// /**
//  * 기본 커스텀 패널 컴포넌트
//  * @param {string, array}
//  * guide: 패널에 대한 설명
//  * designs: BoxClassName에 대한 정보 배열
//  */
// function DefaultCustomPanel({ guide, designs }) {
//   return (
//     <Wrapper>
//       <GuideText content={guide} />
//       <BoxClassName designs={designs} />
//     </Wrapper>
//   );
// }

// /**
//  * 스크롤 되는 커스텀 패널 컴포넌트
//  * @param {string, array}
//  * guide: 패널에 대한 설명
//  * designs: BoxClassName에 대한 정보 배열
//  */
// function ScrollCustomPanel({ guide, designs }) {
//   return (
//     <Wrapper>
//       <ScrollWrapper>
//         <DefaultCustomPanel guide={guide} designs={designs} />
//       </ScrollWrapper>
//     </Wrapper>
//   );
// }

// function CustomPanel() {
//   return (
//     <>
//       <DefaultCustomPanel guide={GUIDES["InputOutput"]} designs={InputOutput} />
//       <ScrollCustomPanel guide={GUIDES["Design"]} designs={Design} />
//     </>
//   );
// }

// export { DefaultCustomPanel, CustomPanel };

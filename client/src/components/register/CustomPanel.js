import StyledScrollbar from "../atom-components/StyledScrollbar";
import BoxClassName from "./BoxClassName";
import { Design, InputOutput, Save } from "./Designs";
import { GUIDES } from "./constants";
import GuideText from "./GuideText";
import { FlexColumnBox } from "../global-components/FlexBox";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
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
 * 필수 절차 & 선택 절차의 공통적인 커스텀 패널 Content
 * @param {*} param0
 * @returns
 */
function BasicContent({ contentList }) {
  return (
    <CardContent>
      <FlexColumnBox gap="1.2rem">
        {contentList.map((data, index) => (
          <FlexColumnBox key={index} gap="1.2rem">
            <GuideText content={data.guide} />
            <BoxClassName designs={data.designs} />
            {contentList.length - 1 !== index && <Divider />}
          </FlexColumnBox>
        ))}
      </FlexColumnBox>
    </CardContent>
  );
}

/**
 * 필수 절차 - 커스텀 패널 컴포넌트
 * @param {string, array}
 * panelList
 * - guide : 패널에 대한 설명 list
 * - designs : BoxClassName에 대한 정보 배열
 */
function DefaultCustomPanel({ panelList }) {
  const [expanded, setExpanded] = useState(true);

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
            <ExpandMoreIcon sx={{ color: "warning.main" }} />
          </ExpandMore>
        }
        sx={{ color: "warning.main" }}
        title="필수 절차입니다. 차례대로 진행해주세요."
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <BasicContent contentList={panelList} />
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
function ScrollCustomPanel({ panelList }) {
  return (
    // <FlexColumnBox sx={{ height: "100%", overflow: "auto" }}>
    <FlexColumnBox sx={{ height: "36rem", overflow: "auto" }}>
      <StyledScrollbar>
        <FlexColumnBox sx={{ width: "100%", height: "100%" }}>
          <CardHeader
            avatar={<EditIcon />}
            sx={{ color: "success.light" }}
            title="선택 과정입니다. 자유롭게 진행해주세요."
          />
          <BasicContent contentList={panelList} />
        </FlexColumnBox>
      </StyledScrollbar>
    </FlexColumnBox>
  );
}

function CustomPanel() {
  // 필수 절차
  const defaultList = [
    { guide: GUIDES["InputOutput"], designs: InputOutput },
    { guide: GUIDES["Save"], designs: Save },
  ];
  // 선택 절차
  const selectList = [{ guide: GUIDES["Design"], designs: Design }];

  return (
    <FlexColumnBox gap="1.6rem">
      <DefaultCustomPanel panelList={defaultList} />
      <ScrollCustomPanel panelList={selectList} />
    </FlexColumnBox>
  );
}

export default CustomPanel;

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

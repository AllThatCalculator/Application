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
import { Box } from "@mui/system";
import useSx from "../../hooks/useSx";

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
    <FlexColumnBox sx={{ height: "100%", overflow: "auto" }}>
      <StyledScrollbar>
        <FlexColumnBox sx={{ width: "100%" }}>
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
  const { HEIGHT_CODE_EDITOR } = useSx();

  // 필수 절차
  const defaultList = [
    { guide: GUIDES["InputOutput"], designs: InputOutput },
    // { guide: GUIDES["Save"], designs: Save },
  ];
  // 선택 절차
  const selectList = [{ guide: GUIDES["Design"], designs: Design }];

  return (
    <FlexColumnBox gap="1.6rem" sx={{ height: HEIGHT_CODE_EDITOR }}>
      <Box sx={{ position: "relative" }}>
        <DefaultCustomPanel panelList={defaultList} />
      </Box>
      <ScrollCustomPanel panelList={selectList} />
    </FlexColumnBox>
  );
}

export default CustomPanel;

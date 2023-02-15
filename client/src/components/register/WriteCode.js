import { useState } from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
  Alert,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import useSx from "../../hooks/useSx";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeEditor from "./CodeEditor";
import CustomPanel from "./CustomPanel";

/**
 * 언어 도움말
 * @param {string} language : 지원 언어
 * @param {string} helpText : 도움말
 */
function LanguageHelp({ language, helpText }) {
  return (
    <FlexBox gap="0.8rem" sx={{ alignItems: "center", m: "0.8rem 0" }}>
      <Tooltip title={helpText}>
        <IconButton disableRipple color="info">
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="subtitle1">Language</Typography>
      <Paper
        variant="outlined"
        sx={{
          p: "0.2rem 0.6rem",
          minWidth: "16rem",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          MsUserSelect: "none",
          userSelect: "none",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", pointerEvents: "none" }}
        >
          {language}
        </Typography>
      </Paper>
    </FlexBox>
  );
}

/**
 * 계산기 코드 작성 컴포넌트
 * - HTML, MARKDOWN, 미리 보기
 * @param {*} props
 * - handleIsPreview : 미리 보기 컨트롤 함수
 */
function WriteCode(props) {
  const { HEIGHT_CODE_EDITOR, subTitleSx, isWindowSmDown } = useSx();

  /** tab 컨트롤 : 계산기 마크다운 정보, 계산 내역 */
  const [tabValue, setTabValue] = useState(0);
  /** tab state */
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  // 탭 메뉴
  const tapList = [
    {
      label: "계산기 코드",
      icon: <CodeIcon />,
    },
    {
      label: "계산기 설명",
      icon: <DescriptionIcon />,
    },
  ];

  // 탭 콘텐츠 컴포넌트
  const tapContentList = [
    // 01. 계산기 코드
    <>
      <LanguageHelp
        language="HTML"
        helpText="직접 구현한 계산기 코드를 아래에 HTML로 작성해주세요."
      />

      <Grid container spacing={2}>
        {/* 열 너비(각 차지하는 열 수) : 1 ~ 12 */}
        <Grid item xs={8}>
          <FlexBox sx={{ height: HEIGHT_CODE_EDITOR }}>
            <CodeEditor
              defaultLanguage="html"
              defaultValue={props.srcCode}
              setData={props.setSrcCode}
            />
          </FlexBox>
        </Grid>
        <Grid item xs={4}>
          <CustomPanel />
        </Grid>
      </Grid>
    </>,
    // 02. 계산기 설명
    <>
      <LanguageHelp
        language="Markdown"
        helpText="계산기에 대한 설명을 Markdown 문법으로 작성해주세요."
      />
      <FlexBox sx={{ height: HEIGHT_CODE_EDITOR }}>
        <CodeEditor
          defaultLanguage="markdown"
          defaultValue={props.manual}
          setData={props.setManual}
        />
      </FlexBox>
    </>,
  ];

  // 모바일 접속 시, "스크린 크기를 키워주세요." 보여주기
  return (
    <Grid container spacing={4}>
      <Grid item sx={{ width: "100%" }}>
        <FlexColumnBox gap="1.6rem" sx={{ width: "100%" }}>
          <Typography sx={{ ...subTitleSx }}>계산기 코드 입력</Typography>
          <FlexColumnBox sx={{ width: "100%" }}>
            <FlexBox
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* 탭 메뉴 */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {tapList.map((data) => (
                  <Tab
                    key={data.label}
                    label={data.label}
                    icon={data.icon}
                    iconPosition="start"
                  />
                ))}
              </Tabs>
              {!isWindowSmDown && (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => props.handleIsPreview()}
                  sx={{ width: "fit-content", height: "fit-content" }}
                >
                  미리보기
                </Button>
              )}
            </FlexBox>
            {/* 계산기 설명, 내 계산 내역 */}
            <Box sx={{ flexGrow: 1 }}>
              {isWindowSmDown && (
                <Alert severity="warning" sx={{ m: "1.2rem 0.8rem" }}>
                  스크린 크기를 키워주세요.
                </Alert>
              )}
              {!isWindowSmDown &&
                tapContentList.map(
                  (data, index) =>
                    index === tabValue && <div key={index}>{data}</div>
                )}
            </Box>
          </FlexColumnBox>
        </FlexColumnBox>
      </Grid>
    </Grid>
  );
}

export default WriteCode;

// import styled from "styled-components";
// import styles from "../styles";
// import { useState } from "react";
// import CalculetBlock from "../calculet-block/CalculetBlock";
// import { TabMenu } from "./TabMenu";
// import CodeEditor from "./CodeEditor";
// import BigTitle from "../atom-components/BigTitle";
// import {
//   FlexColumnLayout,
//   FlexRowLayout,
//   ResponsiveTabletLayout,
// } from "../Layout";
// import { CustomPanel } from "./CustomPanel";

// const WrapperSrcCode = styled.div`
//   width: 713px;
//   // 임시 높이
//   min-height: 486px;
//   height: 100%;
// `;

// const WrapperManual = styled.div`
//   width: 100%;

//   // 임시 높이
//   height: 486px;
// `;

// const WrapperPannel = styled.div`
//   width: 347px;
// `;

// /**
//  * 계산기 코드 작성 컴포넌트
//  * - HTML, MARKDOWN, 미리 보기
//  * @param {*} props
//  */
// function WriteCode(props) {
//   // Tab 버튼에서 선택된 값
//   const [item, setItem] = useState("HTML");

//   /**
//    * Tab 버튼 onClick 함수
//    * @param {*} event
//    */
//   function onClickButtonTab(event) {
//     setItem(event.target.id);
//   }

//   // 탭 메뉴 정보 객체 배열
//   const writeCodeTab = [
//     {
//       text: "HTML",
//       icon: "Code",
//       item: item,
//       onClick: onClickButtonTab,
//     },
//     {
//       text: "MARKDOWN",
//       icon: "MarkDown",
//       item: item,
//       onClick: onClickButtonTab,
//     },
//     {
//       text: "미리 보기",
//       icon: "Eye",
//       item: item,
//       onClick: onClickButtonTab,
//     },
//   ];

//   return (
//     <FlexColumnLayout gap={styles.styleLayout.basic900}>
//       <BigTitle content="계산기 코드 입력하기" />
//       <TabMenu tabs={writeCodeTab} />
//       <FlexRowLayout>
//         {item === "HTML" && (
//           <ResponsiveTabletLayout rowGap="20px" columnGap="20px">
//             <WrapperSrcCode>
//               <CodeEditor
//                 defaultLanguage="html"
//                 defaultValue={props.srcCode}
//                 setData={props.setSrcCode}
//               />
//             </WrapperSrcCode>
//             <WrapperPannel>
//               <CustomPanel />
//             </WrapperPannel>
//           </ResponsiveTabletLayout>
//         )}
//         {item === "MARKDOWN" && (
//           <WrapperManual>
//             <CodeEditor
//               defaultLanguage="markdown"
//               defaultValue={props.manual}
//               setData={props.setManual}
//             />
//           </WrapperManual>
//         )}
//         {item === "미리 보기" && (
//           <CalculetBlock srcCode={props.srcCode} manual={props.manual} />
//         )}
//       </FlexRowLayout>
//     </FlexColumnLayout>
//   );
// }

// export default WriteCode;

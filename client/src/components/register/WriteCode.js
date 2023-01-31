import { useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import useSx from "../../hooks/useSx";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import CalculetBlock from "../calculet-block/CalculetBlock";
import CodeEditor from "./CodeEditor";
import { CustomPanel } from "./CustomPanel";

/**
 * 계산기 코드 작성 컴포넌트
 * - HTML, MARKDOWN, 미리 보기
 * @param {*} props
 */
function WriteCode(props) {
  const { subTitleSx, isWindowSmDown } = useSx();

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
    {
      label: "미리 보기",
      icon: <DescriptionIcon />,
    },
  ];
  // 탭 콘텐츠 컴포넌트
  const tapContentList = [
    // 계산기 코드
    // <FlexBox sx={{ minHeight: "48.6rem" }}>
    //   <FlexBox sx={{ height: "100%" }}>
    //     <CodeEditor
    //       defaultLanguage="html"
    //       defaultValue={props.srcCode}
    //       setData={props.setSrcCode}
    //     />
    //   </FlexBox>
    //   <CustomPanel />
    // </FlexBox>

    // <ResponsiveTabletLayout rowGap="20px" columnGap="20px">

    <Grid container spacing={4} columns={{ sm: 2, md: 2 }}>
      <Grid item sm={1.15} md={1.2} sx={{ width: "100%" }}>
        <CodeEditor
          defaultLanguage="html"
          defaultValue={props.srcCode}
          setData={props.setSrcCode}
        />
      </Grid>
      <Grid item sm={0.85} md={0.8}>
        <CustomPanel />
      </Grid>
    </Grid>,
    // </ResponsiveTabletLayout>
    // 계산기 설명
    <CodeEditor
      defaultLanguage="markdown"
      defaultValue={props.manual}
      setData={props.setManual}
    />,
    <CalculetBlock srcCode={props.srcCode} manual={props.manual} />,
  ];

  // 모바일 접속 시, "PC환경에서만 가능한 기능입니다." 띄우기

  return (
    <Grid container spacing={4}>
      <Grid item sx={{ width: "100%" }}>
        <FlexColumnBox gap="1.6rem">
          <Typography sx={{ ...subTitleSx }}>계산기 코드 입력</Typography>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
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
                    sx={{
                      minHeight: "4.4rem",
                      height: "4.4rem",
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            {/* 계산기 설명, 내 계산 내역 */}
            <FlexBox sx={{ width: "100%" }}>
              {isWindowSmDown && (
                <Typography>스크린 크기를 키워주세요.</Typography>
              )}
              {!isWindowSmDown &&
                tapContentList.map(
                  (data, index) =>
                    index === tabValue && <div key={index}>{data}</div>
                )}
            </FlexBox>
          </Box>
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

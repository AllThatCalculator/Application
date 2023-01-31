import { useState } from "react";
import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import RecordCalculetHistory from "./RecordCalculetHistory";
import CalculateIcon from "@mui/icons-material/Calculate";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

//////
import {
  Tabs,
  Box,
  Tab,
  Fab,
  Zoom,
  Collapse,
  CardContent,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import useSx from "../../hooks/useSx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import Textarea from "@mui/base/Textarea";
/**
 * 마크다운 문법으로 작성된 문자열을 리액트 컴포넌트로 반환하는 함수
 * @param {string} content 마크다운 문법으로 이루어진 string
 * 내부 함수 = code -> 재귀적으로 코드블럭에 syntax highlight 적용
 */
function MarkdownCode({ content }) {
  return (
    <ReactMarkdown
      children={content}
      // components={{
      //   code({ node, inline, className, children, ...props }) {
      //     const match = /language-(\w+)/.exec(className || "");
      //     return !inline && match ? (
      //       <SyntaxHighlighter
      //         children={String(children).replace(/\n$/, "")}
      //         // style={dark}
      //         language={match[1]}
      //         PreTag="div"
      //         {...props}
      //       />
      //     ) : (
      //       <code className={className} {...props}>
      //         {children}
      //       </code>
      //     );
      //   },
      // }}
    />
  );
}

/**
 * 계산기 설명서(매뉴얼)를 볼 것인지 선택하는 토글 버튼과 설명문을 포함하는 컴포넌트
 * @param {string} content 마크다운 문법으로 이루어진 string
 * @param {string} calculetId 계산기 번호
 */
function CalculetManual({ content, calculetId }) {
  /** tab 컨트롤 : 계산기 마크다운 정보, 계산 내역 */
  const [tabValue, setTabValue] = useState(0);
  /** tab state */
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  // 탭 메뉴
  const tapList = [
    {
      label: "계산기 설명",
      icon: <CalculateIcon />,
    },
    {
      label: "내 계산 내역",
      icon: <HistoryIcon />,
    },
  ];

  // 계산기 설명 더보기
  const [isMorePanel, setIsMorePanel] = useState(false);
  function handleOpenIsMorePanel() {
    setIsMorePanel(!isMorePanel);
  }

  const { transitionDuration } = useSx();

  // // 계산기 설명 더미
  // const dummyContent =
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  // 더보기 버튼sx
  const fabAtcBlueStyle = {
    bgcolor: "atcBlue.200",
    "&:hover": {
      bgcolor: "atcBlue.100",
    },
  };

  // 설명 더보기 | 접기
  const fabs = [
    {
      color: "inherit",
      sx: { ...fabAtcBlueStyle },
      justifyContent: "center",
      icon: <KeyboardArrowDownIcon />,
      label: "더보기",
      isMore: false, //현재 펼쳐져 있지 않음
      onClick: handleOpenIsMorePanel,
    },
    {
      color: "secondary",
      sx: null,
      justifyContent: "flex-end",
      icon: <KeyboardArrowUpIcon />,
      label: "접기",
      isMore: true, //현재 펼쳐져 있음
      onClick: handleOpenIsMorePanel,
    },
  ];

  // 계산기 마크다운 콘텐츠
  function CalculetMarkdownCode() {
    return (
      <>
        {fabs.map((fab, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: fab.justifyContent,
            }}
          >
            <Zoom
              key={fab.color}
              in={isMorePanel === fab.isMore}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${
                  isMorePanel === fab.isMore ? transitionDuration.exit : 0
                }ms`,
              }}
              unmountOnExit
            >
              <Fab
                variant="extended"
                sx={fab.sx}
                color={fab.color}
                onClick={fab.onClick}
              >
                {fab.label}
                {fab.icon}
              </Fab>
            </Zoom>
          </Box>
        ))}

        <Collapse in={isMorePanel} timeout="auto" unmountOnExit>
          <Box
            sx={{
              background: (theme) =>
                !isMorePanel && theme.palette.atcLinearBlue[100],
              backgroundColor: isMorePanel && "atcBlue.100",
              p: "1.8rem 2.4rem",
              gap: "2.4rem",
            }}
          >
            <CardContent>
              <MarkdownCode content={content} />
            </CardContent>
          </Box>
        </Collapse>
      </>
    );
  }
  // 계산 내역 저장
  function CalculetSaveRecord() {
    return <RecordCalculetHistory calculetId={calculetId} />;
  }
  // 탭 콘텐츠 컴포넌트
  const tapContentList = [<CalculetMarkdownCode />, <CalculetSaveRecord />];

  return (
    <>
      <Box sx={{ width: "100%", mt: "3.2rem" }}>
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
        <Box>
          {tapContentList.map(
            (data, index) => index === tabValue && <div key={index}>{data}</div>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CalculetManual;

// 토글 버튼
// {
/* <Button
            onClick={handleToggle}
            startIcon={
              <ArrowRightIcon
                sx={{
                  animation:
                    (visibility && "spin 0.5s linear") ||
                    (!visibility && "spin 0.5s reverse"),
                  "@keyframes spin": {
                    "0%": {
                      transform: "rotate(0deg)",
                    },
                    "100%": {
                      transform: "rotate(90deg)",
                    },
                  },
                }}
              />
            }
            sx={{
              backgroundColor: blueGrey[100],
              ".css-1d6wzja-MuiButton-startIcon>*:nth-of-type(1)": {
                fontSize: "2.4rem",
              },
            }}
          >
            자세히
          </Button> */
// }

// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import styled from "styled-components";
// import { BtnToggle } from "../atom-components/ButtonIcon";
// import { BtnGray } from "../atom-components/ButtonTemplate";
// import { FlexRowLayout } from "../Layout";
// import styles from "../styles";
// import RecordCalculetHistory from "./RecordCalculetHistory";
// // import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;

// const WrapperButton = styled(FlexRowLayout)`
//   width: 100%;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: ${styles.styleLayout.basic700};
// `;

// /**
//  * 마크다운 문법으로 작성된 문자열을 리액트 컴포넌트로 반환하는 함수
//  * @param {string} content 마크다운 문법으로 이루어진 string
//  * 내부 함수 = code -> 재귀적으로 코드블럭에 syntax highlight 적용
//  */
// function MarkdownCode({ content }) {
//   return (
//     <ReactMarkdown
//       children={content}
//       components={{
//         code({ node, inline, className, children, ...props }) {
//           const match = /language-(\w+)/.exec(className || "");
//           return !inline && match ? (
//             <SyntaxHighlighter
//               children={String(children).replace(/\n$/, "")}
//               // style={dark}
//               language={match[1]}
//               PreTag="div"
//               {...props}
//             />
//           ) : (
//             <code className={className} {...props}>
//               {children}
//             </code>
//           );
//         },
//       }}
//     />
//   );
// }

// const MarkdownWrapper = styled.div`
//   padding: 10px;
//   ${styles.sytleText.text100}
// `;

// /**
//  * 계산기 설명서(매뉴얼)를 볼 것인지 선택하는 토글 버튼과 설명문을 포함하는 컴포넌트
//  * @param {string} content 마크다운 문법으로 이루어진 string
//  * @param {string} calculetId 계산기 번호
//  */
// function CalculetManual({ content, calculetId }) {
//   // 설명서를 펼칠지 여부를 저장하는 state
//   const [visibility, setVisibility] = useState(false);

//   /**
//    * visibility 값을 반전시키는 버튼 이벤트 함수
//    */
//   function toggle() {
//     setVisibility((current) => !current);
//   }

//   return (
//     <>
//       <div>
//         <WrapperButton>
//           <BtnGray text="자세히" isToggle={visibility} onClick={toggle} />
//           <RecordCalculetHistory calculetId={calculetId} />
//         </WrapperButton>
//         {visibility && (
//           <>
//             <MarkdownWrapper>
//               <MarkdownCode content={content} />
//             </MarkdownWrapper>
//             <Wrapper>
//               <BtnToggle onClick={toggle} />
//             </Wrapper>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default CalculetManual;

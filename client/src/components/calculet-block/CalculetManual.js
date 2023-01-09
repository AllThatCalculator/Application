import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import RecordCalculetHistory from "./RecordCalculetHistory";
import CalculateIcon from "@mui/icons-material/Calculate";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

//////
import { Button, Tabs, Box, Tab, IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HistoryIcon from "@mui/icons-material/History";

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
  // 설명서를 펼칠지 여부를 저장하는 state
  const [visibility, setVisibility] = useState(false);

  /**
   * visibility 값을 반전시키는 버튼 이벤트 함수
   */
  function handleToggle() {
    setVisibility((current) => !current);
  }

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
      icon: <CalculateIcon fontSize="small" />,
    },
    {
      label: "내 계산 내역",
      icon: <HistoryIcon fontSize="small" />,
    },
  ];

  // 계산기 마크다운 콘텐츠
  function CalculetMarkdownCode() {
    return (
      <>
        <Box>
          <MarkdownCode content={content} />
        </Box>
        <IconButton color="primary" onClick={handleToggle}>
          <ArrowDropUpIcon fontSize="large" />
        </IconButton>
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
            marginBottom: "2.0rem",
          }}
        >
          <Tabs
            sx={{ minHeight: "4.4rem", height: "4.4rem" }}
            value={tabValue}
            onChange={handleTabChange}
            textColor="inherit"
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
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "0.4rem 0.4rem 0rem 0rem",
                }}
              />
            ))}
          </Tabs>
        </Box>
        {tapContentList.map(
          (data, index) => index == tabValue && <div key={index}>{data}</div>
        )}
      </Box>
    </>
  );
}

export default CalculetManual;

// 토글 버튼
{
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
}

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

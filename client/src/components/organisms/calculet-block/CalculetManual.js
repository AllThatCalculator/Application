import { useState } from "react";
import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import RecordCalculetHistory from "./RecordCalculetHistory";
import CalculateIcon from "@mui/icons-material/Calculate";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

//////
import { Tabs, Box, Tab, Fab, Zoom, Collapse } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import useSx from "../../../hooks/useSx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ParseHtml from "../../atoms/ParseHtml";
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
 * @param {boolean} isPreview 미리보기인지 여부
 * @param {type} type 계산기 작성 정보
 */
function CalculetManual({ content, calculetId, isPreview, type }) {
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
  function handleOpenIsMorePanel(state) {
    setIsMorePanel(state);
  }

  const { transitionDuration } = useSx();

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
    },
    {
      color: "secondary",
      sx: null,
      justifyContent: "flex-end",
      icon: <KeyboardArrowUpIcon />,
      label: "접기",
      isMore: true, //현재 펼쳐져 있음
    },
  ];

  /**
   * type 0: markdown
   * type 1: html
   */
  function Manual({ type, content }) {
    switch (type) {
      case 0:
        return <MarkdownCode content={content} />;
      case 1:
        return <ParseHtml htmlCodes={content} />;
      default:
        return <></>;
    }
  }

  // 계산기 마크다운 콘텐츠
  function CalculetMarkdownCode() {
    return (
      <>
        <Box>
          <Collapse
            in={isMorePanel}
            // timeout="auto"
            // unmountOnExit
            collapsedSize="24rem" // 일부 먼저 보여주기
            sx={{
              background: (theme) =>
                !isMorePanel && theme.palette.atcLinearBlue[100],
              WebkitMaskImage:
                !isMorePanel &&
                `-webkit-linear-gradient(
                rgba(0, 0, 0, 1),
                rgba(0, 0, 0, 0)
              )`,
            }}
          >
            <Manual type={type} content={content} />
          </Collapse>
        </Box>
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
                onClick={() => handleOpenIsMorePanel(!fab.isMore)}
              >
                {fab.label}
                {fab.icon}
              </Fab>
            </Zoom>
          </Box>
        ))}
      </>
    );
  }
  // 계산 내역 저장
  function CalculetSaveRecord() {
    return (
      <RecordCalculetHistory
        calculetId={calculetId}
        isPreview={isPreview}
        type={type}
      />
    );
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

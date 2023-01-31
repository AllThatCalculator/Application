import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
/**
 * sx hook
 */
function useSx() {
  const WIDTH_CATEGORY_BAR = 250;

  const theme = useTheme();
  /** is window md down? */
  const isWindowMdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  /** is window sm down? */
  const isWindowSmDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  /** is window lg down? */
  const isWindowLgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  /** is window xl down? */
  const isWindowXlDown = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  // 계산기 블럭
  // 정보 컴포넌트 sx 정의
  const boxSx = { gap: "0.6rem", alignItems: "center" };

  const atcLinearWhite = {
    100: "linear-gradient(to bottom right, #FFFFFF, #FFFFFFCC, transparent)",
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // 그림자 정의
  const atcShadow = { 100: "0px 2px 4px #0000004D" };
  const atcTextShadow = { 100: { textShadow: atcShadow[100] } };
  const atcFilterShadow = {
    100: { filter: `drop-shadow(${atcShadow[100]})` },
  };

  // 일정 line 이상 넘어가면 ...
  // 추가 => WebkitLineClamp: "2",
  const ellipsis = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };

  // 로그인, 회원가입 박스 길이 정의
  const widthSx = {
    width: "100%",
    maxWidth: "36rem", // 회원가입/상세내용 에서 따로 정의 해주기
    justifyContent: "center",
    gap: "1.6rem",
  };

  // Sub Title Sx
  const subTitleSx = {
    typography: "h6",
    fontWeight: "bold",
  };

  return {
    WIDTH_CATEGORY_BAR,
    isWindowMdDown,
    isWindowSmDown,
    isWindowLgDown,
    isWindowXlDown,
    boxSx,
    atcLinearWhite,
    transitionDuration,
    atcTextShadow,
    atcFilterShadow,
    ellipsis,
    widthSx,
    subTitleSx,
  };
}
export default useSx;

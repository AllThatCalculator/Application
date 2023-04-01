import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
/**
 * sx hook
 */
function useSx() {
  const WIDTH_CATEGORY_BAR = "40%";
  const HEIGHT_CODE_EDITOR = "72rem";

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
    paddingTop: "8rem",
    // paddingBottom: "16rem",
  };

  // Sub Title Sx
  const subTitleSx = {
    typography: "h6",
    fontWeight: "bold",
  };

  /** 팝업 스타일 */
  const popupLayoutSx = {
    position: "absolute",
    zIndex: 2000,
    bgcolor: "white",
  };
  const popupContentSx = {
    position: "relative",
  };

  // 뱃지 컴포넌트 크기 - ex. (계정 수정) 프로필 사진 변경
  const profileSize = { xs: "10.4rem", sm: "12.2rem", md: "16.0rem" };
  const badgeSize = { xs: "2.2rem", sm: "2.4rem", md: "2.8rem" };
  const badgeIconSize = {
    fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem" },
  };

  return {
    WIDTH_CATEGORY_BAR,
    HEIGHT_CODE_EDITOR,
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
    popupLayoutSx,
    popupContentSx,
    profileSize,
    badgeSize,
    badgeIconSize,
  };
}
export default useSx;

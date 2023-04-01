/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const SNACKBAR_CLOSE = "snackbar/SNACKBAR_CLOSE";
const SNACKBAR_SEVERITY_MESSAGE = "snackbar/SNACKBAR_SEVERITY_MESSAGE";

/** init State ( 초기 상태 ) */
const initialState = {
  open: false,
  severity: "basic" /** [basic, error, warning, info, success] */,
  message: "",
  fullWidth: false, // width : true => 100%
  vertical: "top", // 세로
  horizontal: "center", // 가로
  duration: 2400, // 지속시간
};

/** Action Creator Function ( 액션 생성 함수 ) */
export const onChangeClose = () => ({ type: SNACKBAR_CLOSE });
export const onChangeOpen = ({
  severity,
  message,
  fullWidth,
  vertical,
  horizontal,
  duration,
}) => ({
  type: SNACKBAR_SEVERITY_MESSAGE,
  severity: severity,
  message: message,
  fullWidth: fullWidth,
  vertical: vertical,
  horizontal: horizontal,
  duration: duration,
});

/** reducer정의 */
export default function snackbar(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR_CLOSE:
      return {
        ...state,
        open: false,
        severity: "basic",
        message: "",
        fullWidth: false,
        vertical: "top",
        horizontal: "center",
        duration: 2400,
      };
    case SNACKBAR_SEVERITY_MESSAGE:
      return {
        ...state,
        open: true,
        severity: action.severity,
        message: action.message,
        fullWidth: action.fullWidth,
        vertical: action.vertical,
        horizontal: action.horizontal,
        duration: action.duration,
      };
    default:
      return state;
  }
}

import { useDispatch } from "react-redux";
import { onChangeOpen } from "../modules/snackbar";
import usePage from "./usePage";

/**
 * 스낵바 핸들러
 */
function useSnackbar() {
  const { backPage } = usePage();

  /** Redux State */
  const dispatch = useDispatch();

  /** 스낵바 action */
  const handleOpen = (data) => dispatch(onChangeOpen(data));

  // severity : error, warning, info, success

  /** 뒤로가기 X */
  function openSnackbar(
    severity,
    message,
    fullWidth,
    vertical,
    horizontal,
    duration = 2400
  ) {
    handleOpen({
      severity: severity,
      message: message,
      fullWidth: fullWidth,
      vertical: vertical,
      horizontal: horizontal,
      duration: duration,
    });
  }
  /** 뒤로가기 O */
  function openSnackbarBack(
    severity,
    message,
    fullWidth,
    vertical,
    horizontal,
    duration = 2400
  ) {
    handleOpen({
      severity: severity,
      message: message,
      fullWidth: fullWidth,
      vertical: vertical,
      horizontal: horizontal,
      duration: duration,
    });
    backPage(); // 뒤로가기
  }

  return { openSnackbar, openSnackbarBack };
}

export default useSnackbar;

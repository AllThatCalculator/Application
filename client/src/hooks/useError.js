import { useDispatch } from "react-redux";
import { setAuthError, setClearError, setErrorType } from "../modules/error";

/**
 * error control
 */
function useError() {
  /** Redux State */
  const dispatch = useDispatch();

  /** set error */
  function handleSetAuthError(data) {
    dispatch(setAuthError(data));
  }
  // set error type
  function handleSetErrorType(data) {
    dispatch(setErrorType(data));
  }
  // clear error
  function handleSetClearError() {
    dispatch(setClearError());
  }

  return { handleSetAuthError, handleSetErrorType, handleSetClearError };
}

export default useError;

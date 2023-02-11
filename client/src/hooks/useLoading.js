import { useDispatch } from "react-redux";
import { offLoading, onLoading } from "../modules/loading";

/**
 * loading control
 */
function useLoading() {
  /** Redux State */
  const dispatch = useDispatch();

  const handleOnLoading = () => dispatch(onLoading());
  const handleOffLoading = () => dispatch(offLoading());

  return { handleOnLoading, handleOffLoading };
}

export default useLoading;

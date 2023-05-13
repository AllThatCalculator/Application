import { useDispatch, useSelector } from "react-redux";
import {
  onSetCalculetBookmark,
  onSetCalculetBookmarkLoading,
} from "../modules/calculetBookmark";
import { handleGetCalculetBookmark } from "../utils/handleUserActions";

function useGetCalculetBookmark() {
  /** Redux State */
  const dispatch = useDispatch();
  /** action */
  function handleSetCalculetBookmark(data) {
    dispatch(onSetCalculetBookmark(data));
  }
  function handleSetCalculetBookmarkLoading(data) {
    dispatch(onSetCalculetBookmarkLoading(data));
  }

  // calculetBookmark
  const { bookmark, isLoading } = useSelector((state) => ({
    bookmark: state.calculetBookmark.bookmark,
    isLoading: state.calculetBookmark.isLoading,
  }));

  async function getCalculetBookmark(idToken) {
    await handleSetCalculetBookmarkLoading(true);

    // init
    await handleSetCalculetBookmark();

    // is login?
    if (!!idToken) {
      const response = await handleGetCalculetBookmark(idToken);
      await handleSetCalculetBookmark(response);
    }

    await handleSetCalculetBookmarkLoading(false);
  }

  return { bookmark, isLoading, getCalculetBookmark };
}
export default useGetCalculetBookmark;

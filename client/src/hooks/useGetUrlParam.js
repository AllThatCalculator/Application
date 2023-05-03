import { useParams } from "react-router-dom";
import URL from "../components/PageUrls";

/**
 * 현재 url에서 id 뽑아 내기
 */
function useGetUrlParam() {
  // key=value 형태
  let param = new URLSearchParams(window.location.search);
  let searchUrlId = param.get(URL.SEARCH_ID);
  let categoryMainUrlId = param.get(URL.CATEGORY_MAIN_ID);
  let categorySubUrlId = param.get(URL.CATEGORY_SUB_ID);
  let lenUrlId = param.get(URL.LEN_ID);
  let targetUrlId = param.get(URL.TARGET_ID);

  let uuidUrlId = param.get(URL.USERUID_ID);

  // URL에 포함되어있는 Key, Value 형식의 객체를 반환
  // /:id
  let { id, menu } = useParams();

  return {
    searchUrlId,
    categoryMainUrlId,
    categorySubUrlId,
    lenUrlId,
    targetUrlId,
    uuidUrlId,
    id,
    menu,
  };
}
export default useGetUrlParam;

import { useNavigate } from "react-router-dom";
import URL from "../components/PageUrls";

/** 페이지 */
function usePage() {
  const navigate = useNavigate();

  // 메인 페이지
  function calculetPage() {
    navigate(URL.CALCULET);
  }

  // 계산기 상세
  function calculetIdPage(id) {
    navigate(URL.CALCULET + id);
    window.location.reload();
  }

  // 계산기 등록
  function registerPage() {
    navigate(URL.REGISTER);
  }

  // 계산기 목록
  function calculetListPage() {
    navigate(URL.CALCULET_LIST);
  }

  // 로그인
  function loginPage() {
    navigate(URL.LOGIN);
  }

  // 회원가입
  function signUpPage() {
    navigate(URL.SIGN_UP);
  }

  // 뒤로가기
  function backPage() {
    // window.history.back();
    navigate(-1, { replace: true });
  }
  // 뒤로가기 & 새로고침
  function backRefreshPage() {
    navigate(-1, { replace: true });
    window.location.reload(true);
  }

  // 검색창
  function searchPage(keyword) {
    navigate(URL.SEARCH + "?" + URL.SEARCH_ID + "=" + keyword);
  }
  // 검색창
  function searchOptionPage(keyword, categoryMainId, categorySubId, len) {
    let url = URL.SEARCH + "?" + URL.SEARCH_ID + "=" + keyword;

    url +=
      categoryMainId !== ""
        ? `&&${URL.CATEGORY_MAIN_ID}=${categoryMainId}`
        : "";
    url +=
      categorySubId !== "" ? `&&${URL.CATEGORY_SUB_ID}=${categorySubId}` : "";
    url += `&&${URL.LEN_ID}=${len}`;

    navigate(url);
  }

  return {
    calculetPage,
    calculetIdPage,
    registerPage,
    calculetListPage,
    loginPage,
    signUpPage,
    backPage,
    backRefreshPage,
    searchPage,
    searchOptionPage,
  };
}
export default usePage;

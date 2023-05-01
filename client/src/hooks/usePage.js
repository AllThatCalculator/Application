import { useNavigate } from "react-router-dom";
import URL from "../components/PageUrls";

/** 페이지 */
function usePage() {
  const navigate = useNavigate();

  // 메인 페이지
  function calculetPage() {
    navigate(URL.CALCULET);
  }
  // 메인 페이지 & 새로고침
  function calculetRefreshPage() {
    navigate(URL.CALCULET);
    window.location.reload(true);
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

  function makeCalculetListOptionUrl(
    categoryMainId,
    categorySubId,
    len,
    target
  ) {
    let url = "";
    // 대분류
    url +=
      categoryMainId !== ""
        ? `&&${URL.CATEGORY_MAIN_ID}=${categoryMainId}`
        : "";
    // 소분류
    url +=
      categorySubId !== "" ? `&&${URL.CATEGORY_SUB_ID}=${categorySubId}` : "";
    // 페이지 당 계산기 렌더할 개수
    url += len !== 0 ? `&&${URL.LEN_ID}=${len}` : "";

    // 통합 검색 / 제목 / 설명
    url += target !== "" ? `&&${URL.TARGET_ID}=${target}` : "";

    return url;
  }

  // 계산기 검색 - option
  function searchOptionPage(
    keyword,
    categoryMainId,
    categorySubId,
    len,
    target
  ) {
    // 검색어
    let url = URL.SEARCH + "?" + URL.SEARCH_ID + "=" + keyword;

    url += makeCalculetListOptionUrl(
      categoryMainId,
      categorySubId,
      len,
      target
    );

    navigate(url);
  }

  // 프로필 계산기 검색 - option
  function profileCalculetSearchOptionPage(
    uuid,
    categoryMainId,
    categorySubId,
    len
  ) {
    let url = URL.PROFILE + "?" + `&&${URL.USERUID_ID}=${uuid}`;

    url += makeCalculetListOptionUrl(categoryMainId, categorySubId, len, "");
    navigate(url);
  }
  // function searchOptionPage(keyword, categoryMainId, categorySubId, len) {
  //   // 검색어
  //   let url = URL.SEARCH + "?" + URL.SEARCH_ID + "=" + keyword;

  //   // 대분류
  //   url +=
  //     categoryMainId !== ""
  //       ? `&&${URL.CATEGORY_MAIN_ID}=${categoryMainId}`
  //       : "";
  //   // 소분류
  //   url +=
  //     categorySubId !== "" ? `&&${URL.CATEGORY_SUB_ID}=${categorySubId}` : "";
  //   // 페이지 당 계산기 렌더할 개수
  //   url += `&&${URL.LEN_ID}=${len}`;

  //   navigate(url);
  // }

  // 프로필 uuid 없으면 내 페이지
  function profilePage() {
    navigate(URL.PROFILE);
  }

  // uuid 프로필 페이지
  function profileUserIdPage(uuid) {
    navigate(URL.PROFILE + "?" + `&&${URL.USERUID_ID}=${uuid}`);
  }

  // 설정
  function settingPage() {
    navigate(URL.SETTING);
  }
  // 설정 - 계정
  function settingAccountPage() {
    navigate(URL.SETTING + "/" + URL.ACCOUNT_ID);
  }
  // 설정 - 비밀번호 변경
  function settingPasswordPage() {
    navigate(URL.SETTING + "/" + URL.PASSWORD_ID);
  }

  // 회원탈퇴완료
  function deleteCompletePage() {
    navigate(URL.DELETE_COMPLETE);
  }

  return {
    calculetPage,
    calculetRefreshPage,
    calculetIdPage,
    registerPage,
    calculetListPage,
    loginPage,
    signUpPage,
    backPage,
    backRefreshPage,
    searchPage,
    searchOptionPage,
    profileCalculetSearchOptionPage,
    profilePage,
    profileUserIdPage,
    settingPage,
    settingAccountPage,
    settingPasswordPage,
    deleteCompletePage,
  };
}
export default usePage;

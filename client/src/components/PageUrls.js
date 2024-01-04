/**
 * 각 페이지 url
 */
const URL = {
  // 계산기 상세
  CALCULET: "/",

  // 계산기 목록
  CALCULET_LIST: "/calculet-list",

  // 계산기 저작
  REGISTER: "/register",

  // 계산기 저작 테스트 페이지
  REGISTER_TEST: "/register-test",

  // 검색 리스트
  SEARCH: "/search",

  // 로그인
  LOGIN: "/login",

  // 회원 가입
  SIGN_UP: "/sign-up",

  // // 계산기 신고
  // REPORT: "/report",

  // 프로필
  PROFILE: "/profile",

  // 설정
  SETTING: "/setting",

  // 마이 계산기
  MY_CALCULET: "/my-calculet",

  // 회원탈퇴 완료 페이지
  DELETE_COMPLETE: "/delete-complete",

  //============변수================
  /** 계산기 id */
  CALCULET_ID: "id", // :id
  /** 검색 id */
  SEARCH_ID: "keyword",
  CATEGORY_MAIN_ID: "categoryMain",
  CATEGORY_SUB_ID: "categorySub",
  LEN_ID: "len",
  TARGET_ID: "target",
  /** 설정 id */
  MENU_ID: "menu", // :menu
  ACCOUNT_ID: "account", // 계정
  PASSWORD_ID: "password", // 비밀번호 변경
  /** uuid */
  USERUID_ID: "who", // uuid
  // blocked
  BLOCKED_ID: "blocked",
};
export default URL;

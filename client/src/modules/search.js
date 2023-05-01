/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const SEARCH_RESULT_LIST = "search/SEARCH_RESULT_LIST"; // 계산기 전체 목록 | 단위 변환기 제외.
const SEARCH_RESULT_LIST_INIT = "search/SEARCH_RESULT_LIST_INIT";
const SEARCH_RESULT_COUNT = "search/SEARCH_RESULT_COUNT";
const SEARCH_RESULT_PREVIEW_LIST = "search/SEARCH_RESULT_PREVIEW_LIST";
const SEARCH_RESULT_PREVIEW_LIST_INIT =
  "search/SEARCH_RESULT_PREVIEW_LIST_INIT";

/** init State ( 초기 상태 ) */
const initialState = {
  resultList: [
    // 검색 결과
    // {
    //   "id": "9dc33a8f-7647-4598-ac0b-2d1089c89404",
    //   "title": "테스트 계산기",
    //   "description": "이 계산기에 대한 한 줄 설명",
    //   "categoryMainId": 1,
    //   "categorySubId": 1,
    //   "viewCnt": 0,
    //   "contributor": {
    //     "id": "FmBZs9SG8ybc0hla149hKXXTnT52",
    //     "userName": "test user",
    //     "profileImgSrc": "/file/profile/FmBZs9SG8ybc0hla149hKXXTnT52"
    //   }
    // }
  ],
  count: 0, // 총 검색결과 수
  resultPreviewList: [], // 검색 결과 미리보기
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetSearchResult(data) {
  return { type: SEARCH_RESULT_LIST, data };
}
export function onResetSearchResult() {
  return { type: SEARCH_RESULT_LIST_INIT };
}
export function onSetSearchResultCount(data) {
  return { type: SEARCH_RESULT_COUNT, data };
}
export function onSetSearchResultPreview(data) {
  return { type: SEARCH_RESULT_PREVIEW_LIST, data };
}
export function onResetSearchResultPreview() {
  return { type: SEARCH_RESULT_PREVIEW_LIST_INIT };
}

/** reducer정의 */
function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULT_LIST:
      return {
        ...state,
        resultList: action.data,
      };
    case SEARCH_RESULT_LIST_INIT:
      return {
        ...state,
        resultList: [],
      };
    case SEARCH_RESULT_COUNT:
      return {
        ...state,
        count: action.data,
      };
    case SEARCH_RESULT_PREVIEW_LIST:
      return {
        ...state,
        resultPreviewList: action.data,
      };
    case SEARCH_RESULT_PREVIEW_LIST_INIT:
      return {
        ...state,
        resultPreviewList: [],
      };
    default:
      return state;
  }
}
export default search;
